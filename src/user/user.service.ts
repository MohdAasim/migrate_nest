import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async createUser(email: string): Promise<User> {
    return this.userModel.create({ email } as any);
  }

  async updateUserOTP(
    userId: number,
    otp: string,
    otpExpiresAt: Date,
  ): Promise<void> {
    await this.userModel.update(
      { otp, otpExpiresAt },
      { where: { id: userId } },
    );
  }

  async clearUserOTP(userId: number): Promise<void> {
    await this.userModel.update(
      { otp: null, otpExpiresAt: null },
      { where: { id: userId } },
    );
  }
}
