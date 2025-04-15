import crypto from "crypto";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { config } from "../config/config";
import { createError } from "../middleware/errorHandler";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  username: string;
  role: string;
}

export class JwtUtils {
  static encryptToken(token: string): string {
    const iv = crypto.randomBytes(12); 
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(config.ENCRYPTION_SECRET!, "hex"), iv);

    const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
    const authTag = cipher.getAuthTag();

    return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
  }

  static decryptToken(encryptedText: string): string {
    const [ivHex, authTagHex, encryptedHex] = encryptedText.split(":");
    if (!ivHex || !authTagHex || !encryptedHex) throw createError("INVALID_ENCRYPTED_TOKEN");

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(config.ENCRYPTION_SECRET!, "hex"), iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  }

  static generateToken(userId: string, username: string, role: string, rememberMe?: boolean): string {
    const token = jwt.sign({ id: userId, username, role }, config.JWT_SECRET as Secret, { expiresIn: rememberMe ? "7d" : "1h" });
    return this.encryptToken(token);
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, config.JWT_REFRESH_SECRET as Secret, { expiresIn: "7d" });
  }

  static verifyToken(encryptedToken: string): CustomJwtPayload {
    const decryptedToken = this.decryptToken(encryptedToken);
    return jwt.verify(decryptedToken, config.JWT_SECRET as Secret) as CustomJwtPayload;
  }

  static verifyRefreshToken(token: string): CustomJwtPayload {
    return jwt.verify(token, config.JWT_REFRESH_SECRET as Secret) as CustomJwtPayload;
  }

  static refreshAccessToken(refreshToken: string): string {
    const { id, username, role } = this.verifyRefreshToken(refreshToken);
    return this.generateToken(id, username, role);
  }
}
