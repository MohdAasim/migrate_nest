import { Body, Controller, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AddToCartDto } from '../dto/cart.dto';
import { CartService } from './cart.service';
import { JwtAuthGuard, AuthenticatedRequest } from './guards/jwt-auth.guard';

@Controller('/api/v1/cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  addToCart(@Body() body: AddToCartDto, @Req() req: AuthenticatedRequest) {
    return this.cartService.addMultipleToCart(req.user.id, body.items);
  }
}
