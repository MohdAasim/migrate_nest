import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepositoryService } from './product-repository.service';
import { CreateProductDto, ProductQueryDto } from '../dto/product.dto';
import { ALLOWED_CATEGORIES } from '../utils/constants';
import { Op } from 'sequelize';
import { ProductFilters } from '../types/product.types';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepositoryService) {}

  /**
   * Get a paginated list of products with optional filters.
   */
  async getProducts(queryParams: ProductQueryDto) {
    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const offset = (page - 1) * limit;

    const { search, category, minPrice, maxPrice, rating } = queryParams;

    const where: ProductFilters = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      where.price = { [Op.lte]: maxPrice };
    }

    if (rating) {
      where.rating = { [Op.gte]: rating };
    }

    const { count, rows } = await this.productRepo.findAndCountProducts(
      where,
      limit,
      offset,
    );

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    };
  }

  /**
   * Create a new product.
   */
  async createProduct(productData: CreateProductDto) {
    const { name, price, category } = productData;

    if (!name || !price) {
      throw new BadRequestException('Name and price are required.');
    }

    if (category && !ALLOWED_CATEGORIES.includes(category as any)) {
      throw new BadRequestException(
        `Invalid category. Allowed categories are: ${ALLOWED_CATEGORIES.join(', ')}.`,
      );
    }

    return await this.productRepo.createProduct(productData);
  }

  /**
   * Get a product by its ID.
   */
  async getProductById(id: number) {
    const product = await this.productRepo.findProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
