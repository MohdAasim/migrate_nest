import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductQueryDto } from '../dto/product.dto';

@Controller('api/v1/products')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@Query() query: ProductQueryDto) {
    this.logger.log('Fetching all products with filters');
    return this.productService.getProducts(query);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    this.logger.log('Creating new product');
    const newProduct =
      await this.productService.createProduct(createProductDto);
    return {
      message: 'Product created successfully',
      product: newProduct,
    };
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Fetching product with ID: ${id}`);
    const product = await this.productService.getProductById(id);
    return { product };
  }
}
