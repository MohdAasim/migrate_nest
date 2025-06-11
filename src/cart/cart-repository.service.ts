import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from '../entities/cart.entity';

@Injectable()
export class CartRepositoryService {
  constructor(
    @InjectModel(CartItem)
    private readonly cartModel: typeof CartItem,
  ) {}

  async findOrCreateCartItem(
    userId: number,
    productId: number,
    quantity: number,
  ) {
    return this.cartModel.findOrCreate({
      where: { userId, productId },
      defaults: { quantity } as CartItem,
    });
  }

  async findCartItem(userId: number, productId: number) {
    return this.cartModel.findOne({ where: { userId, productId } });
  }

  async findAllCartItems(userId: number) {
    return this.cartModel.findAll({
      where: { userId },
      include: ['product'],
    });
  }

  async updateCartItemQuantity(item: CartItem, quantity: number) {
    item.quantity = quantity;
    return await item.save();
  }

  async incrementCartItemQuantity(item: CartItem, quantity: number) {
    item.quantity += quantity;
    return await item.save();
  }

  async deleteCartItem(userId: number, productId: number) {
    return this.cartModel.destroy({ where: { userId, productId } });
  }

  async clearCartItems(userId: number) {
    return this.cartModel.destroy({ where: { userId } });
  }
}
