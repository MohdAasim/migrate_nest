import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from '../../entities/cart.entity';

@Injectable()
export class CartRepoService {
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

  async incrementCartItemQuantity(item: CartItem, quantity: number) {
    item.quantity += quantity;
    return await item.save();
  }
}
