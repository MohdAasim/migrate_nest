import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtilService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [JwtUtilService],
  exports: [JwtUtilService],
})
export class UtilsModule {}
