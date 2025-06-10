/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, Length } from 'class-validator';

export class SendOtpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  declare email: string;
}

export class VerifyOtpDto {
  @IsEmail()
  declare email: string;

  @IsString()
  @Length(6, 6)
  declare otp: string;
}
