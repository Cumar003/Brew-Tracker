import fs from "fs";
import path from "path";
import nodemailer from 'nodemailer';

import { config } from "../config/config";
import { createError } from "../middleware/errorHandler";

export const transporter = nodemailer.createTransport({
  service: config.EMAIL_CONFIG_SERVICE,
  auth: {
      user: config.EMAIL_CONFIG_USER,
      pass: config.EMAIL_CONFIG_PASS
  }
})

export class EmailUtils {
  static async getEmailTemplate(templateName: string): Promise<string> {
      const templatePath = path.join(
        __dirname,
        `../templates/${templateName}.mjml`
      );
      try {
        const template = fs.readFileSync(templatePath, "utf-8");
        return template;
      } catch (error) {
        throw createError("TEMPLATE_READ_ERROR");
      }
    }

  static async sendEmail(to: string, subject: string, htmlContent: string) {
    const mailOptions = {
      from: config.EMAIL_CONFIG_USER,
      to,
      subject,
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error("EMAIL_SENDING_FAILED");
    }
  }
}
