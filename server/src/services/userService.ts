import { createError } from "../middleware/errorHandler";
import { UserRepository } from "../repositories/userRepository";

export class UserService {

  private userRepository = new UserRepository();

  public async getUserId(userId: string) {
    if (!userId) throw createError("USER_NOT_FOUND");

    const user = await this.userRepository.findById(userId);

    return user;
  }

  public async getUserByUsername(username: string) {
    if (!username) throw createError("USER_NOT_FOUND");

    const user = await this.userRepository.findByUsername(username);
    if (!user) throw createError("USER_NOT_FOUND");

    return user;
  }
}
