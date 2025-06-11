import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddToCartDto, UpdateCartItemDto } from '../dto/cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard, AuthenticatedRequest } from './guards/jwt-auth.guard';

@Controller('/api/v1/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async addToCart(
    @Body() body: AddToCartDto,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`Adding items to cart for user ${req.user.id}`);
    return this.cartService.addMultipleToCart(req.user.id, body.items);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getCart(@Req() req: AuthenticatedRequest) {
    this.logger.log(`Fetching cart for user ${req.user.id}`);
    return this.cartService.getCartItems(req.user.id);
  }

  @Put('/:productId')
  @HttpCode(HttpStatus.OK)
  async updateCartItem(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() body: UpdateCartItemDto,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`Updating cart item ${productId} for user ${req.user.id}`);
    return this.cartService.updateCartItem(
      req.user.id,
      productId,
      body.quantity,
    );
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCartItem(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    this.logger.log(`Removing cart item ${productId} for user ${req.user.id}`);
    await this.cartService.removeCartItem(req.user.id, productId);
  }

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart(@Req() req: AuthenticatedRequest) {
    this.logger.log(`Clearing cart for user ${req.user.id}`);
    await this.cartService.clearCart(req.user.id);
  }
}
