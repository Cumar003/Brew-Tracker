import { IUser, User } from "../models/user";
import { createError } from "../middleware/errorHandler";

export class UserRepository {
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

  public async findByUsername(username: string): Promise<IUser | null> {
    try {
      return await User.findOne({ username }).select(
        "-email -role -createdAt -updatedAt -_id"
      );
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
}
