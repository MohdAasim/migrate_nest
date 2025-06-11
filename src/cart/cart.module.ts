import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepositoryService } from './cart-repository.service';
import { UtilsModule } from '../utils/utils.module';
import { AuthModule } from '../auth/auth.module';
import { CartItem } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem, Product]),
    UtilsModule,
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepositoryService],
  exports: [CartRepositoryService],
})
export class CartModule {}
