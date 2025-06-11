import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/product.dto';
import { ProductFilters } from '../types/product.types';
import { WhereOptions } from 'sequelize';

@Injectable()
export class ProductRepositoryService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async findAndCountProducts(
    filters: ProductFilters,
    limit: number,
    offset: number,
  ) {
    return this.productModel.findAndCountAll({
      where: filters as WhereOptions<Product>,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
  }

  async createProduct(data: CreateProductDto) {
    return this.productModel.create(data as any);
  }

  async findProductById(id: number) {
    return this.productModel.findByPk(id);
  }
}
