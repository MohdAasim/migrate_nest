/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsNumber, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemDto {
  @IsNumber({}, { message: 'Product ID must be a number' })
  @Min(1, { message: 'Product ID must be greater than 0' })
  declare productId: number;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  declare quantity: number;
}

export class AddToCartDto {
  @IsArray({ message: 'Items must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  declare items: CartItemDto[];
}

export class UpdateCartItemDto {
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be at least 1' })
  declare quantity: number;
}
