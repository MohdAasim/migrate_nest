import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { UserService } from '../repository/user/user.service';
import { MailerService } from '../mailer/mailer.service';
import { JwtUtilService } from '../utils/jwt.service';

export interface AuthResponse {
  message: string;
  token?: string;
  userId?: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly jwtUtilService: JwtUtilService,
  ) {}

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTPService(email: string): Promise<AuthResponse> {
    try {
      const otp = this.generateOTP();
      const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

      let user = await this.userService.findUserByEmail(email);
      if (!user) {
        user = await this.userService.createUser(email);
      }

      await this.userService.updateUserOTP(user.id, otp, otpExpiresAt);

      await this.mailerService.sendEmail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
      });

      return { message: 'OTP sent to email' };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.error('Error sending OTP:', errorMessage);
      throw new BadRequestException('Failed to send OTP');
    }
  }

  async verifyOTPService(email: string, otp: string): Promise<AuthResponse> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (
        !user ||
        user.otp !== otp ||
        !user.otpExpiresAt ||
        new Date() > user.otpExpiresAt
      ) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      await this.userService.clearUserOTP(user.id);

      const token = this.jwtUtilService.generateToken({
        id: user.id,
        email: user.email,
      });

      return {
        message: 'Login successful',
        token,
        userId: user.id,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      this.logger.warn('OTP verification failed:', errorMessage);
      throw error;
    }
  }
}
