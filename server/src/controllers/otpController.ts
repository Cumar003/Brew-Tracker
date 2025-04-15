import { OtpService } from "../services/otpService";
import { NextFunction, Response, Request } from "express";

export class OtpController {

    private otpService = new OtpService();

    public async sendOtp(req: Request, res: Response, next: NextFunction){
        const { email } = req.body;
    
        try{
          await this.otpService.sendOtp(email);
          res.status(200).json({
            success: true,
            message: `OTP send successfully to ${email}`
          });
        } catch(err){
          next(err);
        }
      }
    
      public async verifyOtp(req: Request, res: Response, next: NextFunction){
        const { email, otp } = req.body
    
        try{
          const isOtpValid = await this.otpService.validateOtp(email, otp);
    
          if(isOtpValid){
            res.status(200).json({
              success: true,
              message: "OTP verified successfully"
            })
          }
        } catch(err){
          next(err)
        }
      }
}