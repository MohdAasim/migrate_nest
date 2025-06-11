import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { MailerModule } from '../mailer/mailer.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UserModule, MailerModule, UtilsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
