import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepositoryService } from './product-repository.service';
import { Product } from '../entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepositoryService],
  exports: [ProductRepositoryService, ProductService],
})
export class ProductModule {}
