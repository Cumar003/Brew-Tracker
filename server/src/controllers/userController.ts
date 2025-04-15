import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService = new UserService();

  public async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserId(req.user.id);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getUserByUsername(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.params

      const user = await this.userService.getUserByUsername(username)

      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      next(err);
    }
  }
}
