import mjml from "mjml";
import bcrypt from "bcryptjs";

import { Request } from "express";
import { IUser } from "../../models/user";
import { config } from "../../config/config";
import { JwtUtils } from "../../utils/jwtUtils";
import { eventBus } from "../../events/EventBus";
import { EmailUtils } from "../../utils/emailUtils";
import { USER_EVENTS } from "../../events/user.events";
import { createError } from "../../middleware/errorHandler";
import { UserRepository } from "../../repositories/userRepository";
import { AuthRepository } from "../../repositories/admin/authRepository";

export class AuthService {
  private authRepository = new AuthRepository();
  private userRepository = new UserRepository();

  public async registerUser(req: Request, email: string, username: string, password: string) {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
  
      if (existingUser) {
        if (!existingUser.emailVerified) {
          throw createError("EMAIL_EXISTS", { otpRedirect: true });
        }
  
        throw createError("EMAIL_EXISTS");
      }
  
      const existingUsername = await this.userRepository.findByUsername(username);
      if (existingUsername) {
        throw createError("USERNAME_EXISTS");
      }
  
      const newUser = await this.authRepository.createUser(
        email,
        username,
        password
      );

      eventBus.emit(USER_EVENTS.REGISTERED, { user: newUser, req });
  
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  
  public async loginUser(req: Request, email: string, password: string, rememberMe: boolean) {
    try {
      const user = (await this.userRepository.findByEmail(email)) as IUser;
      if (!user) {
        throw createError("USER_NOT_FOUND");
      }

      const isMatch = await user.matchPassword(password);

      if (!isMatch) {
        throw createError("INVALID_CREDENTIALS");
      }

      if (!user.emailVerified) {
        throw createError("EMAIL_NOT_VERIFIED");
      }

      const token = JwtUtils.generateToken(
        user._id.toString(),
        user.username,
        user.role,
        rememberMe
      );
      const refreshToken = JwtUtils.generateRefreshToken(user._id.toString());

      eventBus.emit(USER_EVENTS.LOGGED_IN, { user, req });

      return { user, token, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  public async refreshToken(req: Request, refreshToken: string) {
    if (!refreshToken) throw createError("JWT_TOKEN_MISSING");

    const decodedToken = JwtUtils.verifyRefreshToken(refreshToken);
    if (!decodedToken) throw createError("JWT_REFRESH_TOKEN_INVALID");

    if (typeof decodedToken === "string")
      throw createError("JWT_MALFORMED_TOKEN");

    const user = await this.userRepository.findById(decodedToken.id);
    if (!user) throw createError("USER_NOT_FOUND");

    const newAccessToken = JwtUtils.refreshAccessToken(refreshToken);
    if (!newAccessToken) throw createError("JWT_TOKEN_REFRESH_FAILED");


    return newAccessToken;
  }

  public async requestPasswordReset(req: Request ,email: string) {
    try {
      const user = (await this.userRepository.findByEmail(email)) as IUser;
      if (!user) throw createError("USER_NOT_FOUND");

      const resetToken = JwtUtils.generateToken(
        user._id.toString(),
        user.username,
        user.role
      );
      const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

      await this.authRepository.setResetToken(
        email,
        resetToken,
        resetTokenExpires
      );

      const resetLink = `${config.URL}/reset-password?resetToken=${resetToken}`;

      const mjmlTemplate = await EmailUtils.getEmailTemplate(
        "resetPasswordTempalte"
      );
      const compiledHtml = mjml(
        mjmlTemplate.replace("{{link}}", resetLink)
      ).html;

      const response = await EmailUtils.sendEmail(
        email,
        "Password change",
        compiledHtml
      );

      return response;
    } catch (err) {
      throw err;
    }
  }

  public async resetPassword(req: Request, token: string, newPassword: string) {
    try {
      const decoded = JwtUtils.verifyToken(token);

      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        throw createError("JWT_EXPIRED_TOKEN");
      }

      const user = await this.userRepository.findById(decoded.id);
      if (!user) throw createError("USER_NOT_FOUND");

      if (
        user.resetToken !== token ||
        !user.resetTokenExpires ||
        user.resetTokenExpires < Date.now()
      )
        throw createError("JWT_EXPIRED_TOKEN");

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const response = await this.authRepository.updatePassword(
        user.email,
        hashedPassword
      );

      await this.authRepository.clearResetToken(user.email);

      return response;
    } catch (err) {
      throw err;
    }
  }
}
