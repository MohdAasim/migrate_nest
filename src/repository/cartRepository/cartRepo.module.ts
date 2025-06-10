import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from '../../entities/cart.entity';
import { CartRepoService } from './cartRepo.service';
import { Product } from '../../entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([CartItem, Product])],
  providers: [CartRepoService],
  exports: [CartRepoService],
})
export class CartRepoModule {}
