import nodemailer from 'nodemailer';
import config from '../config/environment';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      }
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationCode = token.substring(0, 6).toUpperCase();

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: 'Your FitnessTracker Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Welcome to FitnessTracker!</h1>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; margin-bottom: 10px;">Your verification code is:</p>
            
            <div style="
              background-color: #f5f5f5;
              border-radius: 8px;
              padding: 15px;
              margin: 10px 0;
              border: 1px dashed #ccc;
            ">
              <h2 style="
                font-size: 32px;
                color: #4CAF50;
                letter-spacing: 5px;
                margin: 0;
                font-family: monospace;
              ">${verificationCode}</h2>
            </div>
            
            <p style="color: #666; margin-top: 20px;">
              Enter this code in the app to verify your account
            </p>
          </div>
        </div>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService(); 