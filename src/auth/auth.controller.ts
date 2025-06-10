import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService, AuthResponse } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from '../dto/auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sendOtp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<AuthResponse> {
    return this.authService.sendOTPService(sendOtpDto.email);
  }

  @Post('verifyOtp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<AuthResponse> {
    return this.authService.verifyOTPService(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );
  }
}
