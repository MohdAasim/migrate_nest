import { Injectable } from '@nestjs/common';
import { CartItemDto } from 'src/dto/cart.dto';
import { CartRepoService } from 'src/repository/cartRepository/cartRepo.service';
import { CartItem } from 'src/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepoService) {}

  async addMultipleToCart(userId: number, items: CartItemDto[]) {
    const results: CartItem[] = [];
    for (const { productId, quantity } of items) {
      const [item, created] = await this.cartRepo.findOrCreateCartItem(
        userId,
        productId,
        quantity,
      );

      if (!created) {
        const updatedItem = await this.cartRepo.incrementCartItemQuantity(
          item,
          quantity,
        );
        results.push(updatedItem);
      } else {
        results.push(item);
      }
    }

    return results;
  }
}
