import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepoModule } from 'src/repository/cartRepository/cartRepo.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [CartRepoModule, UtilsModule],
  controllers: [CartController],
  providers: [CartService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class CartModule {}
