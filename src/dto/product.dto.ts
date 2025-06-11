/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsOptional, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

const ALLOWED_CATEGORIES = [
  'electronics',
  'fashion',
  'books',
  'appliances',
  'furniture',
];

export class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  declare name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  declare description?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  declare price: number;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  declare image_url?: string;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  @IsIn(ALLOWED_CATEGORIES, {
    message: `Category must be one of: ${ALLOWED_CATEGORIES.join(', ')}`,
  })
  declare category?: string;
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  declare search?: string;

  @IsOptional()
  @IsString()
  @IsIn(ALLOWED_CATEGORIES)
  declare category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  declare minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  declare maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  declare rating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  declare page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  declare limit?: number;
}
