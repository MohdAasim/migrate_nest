import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItemDto } from 'src/dto/cart.dto';
import { CartItem } from 'src/entities/cart.entity';
import { CartRepositoryService } from './cart-repository.service';

@Injectable()
export class CartService {
  constructor(private readonly cartRepo: CartRepositoryService) {}

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

  /**
   * Get all items in the user's cart.
   */
  async getCartItems(userId: number) {
    return await this.cartRepo.findAllCartItems(userId);
  }

  /**
   * Update the quantity of a cart item.
   */
  async updateCartItem(userId: number, productId: number, quantity: number) {
    const item = await this.cartRepo.findCartItem(userId, productId);
    if (!item) {
      throw new NotFoundException('Item not found in cart');
    }

    return await this.cartRepo.updateCartItemQuantity(item, quantity);
  }

  /**
   * Remove an item from the user's cart.
   */
  async removeCartItem(userId: number, productId: number) {
    const deleted = await this.cartRepo.deleteCartItem(userId, productId);
    if (!deleted) {
      throw new NotFoundException('Item not found in cart');
    }
  }

  /**
   * Clear all items from the user's cart.
   */
  async clearCart(userId: number) {
    await this.cartRepo.clearCartItems(userId);
  }
}
