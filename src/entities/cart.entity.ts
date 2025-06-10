import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Product } from 'src/entities/product.entity';

@Table({
  tableName: 'CartItems',
  timestamps: true,
})
export class CartItem extends Model<CartItem> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantity: number;

  // Associations
  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Product)
  declare product: Product;
}
