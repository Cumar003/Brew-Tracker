import { User, IUser } from "../../models/user";
import { createError } from "../../middleware/errorHandler";

export class AuthRepository {
  public async findByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async findById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async createUser(
    email: string,
    username: string,
    password: string
  ): Promise<IUser> {
    try {
      const newUser = new User({ email, username, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async update(
    email: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate({ email }, data, { new: true });
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async updatePassword(
    email: string,
    newPassword: string
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { email },
        { password: newPassword },
        { new: true }
      );
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async setResetToken(
    email: string,
    resetToken: string,
    resetTokenExpires: Date
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { email },
        { resetToken, resetTokenExpires },
        { new: true }
      );
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async clearResetToken(email: string): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { email },
        { $unset: { resetToken: 1, resetTokenExpires: 1 } },
        { new: true }
      );
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }
}
