import { createError } from "../middleware/errorHandler";
import { IUser, User } from "../models/user";

export class OtpRepository {
  public async updateOtp(
    email: string,
    otp: string,
    otpExpiry: number
  ): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { email },
        { otp, otpExpiry },
        { new: true }
      );
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }

  public async clearOtp(email: string): Promise<IUser | null> {
    try {
      return await User.findOneAndUpdate(
        { email },
        { $unset: { otp: 1, otpExpiry: 1 } },
        { new: true }
      );
    } catch (err) {
      throw createError("DB_QUERY_FAILED");
    }
  }
}
