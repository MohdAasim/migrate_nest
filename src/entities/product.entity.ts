import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  Index,
} from 'sequelize-typescript';
import { CartItem } from './cart.entity';

@Table({
  tableName: 'Products',
  timestamps: true,
  indexes: [
    { fields: ['name'] }, // Index for faster search by name
    { fields: ['category'] }, // Index for filtering by category
    { fields: ['price'] }, // Index for sorting/filtering by price
  ],
})
export class Product extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Index
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare image_url: string;

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare category: string;

  // Associations
  @HasMany(() => CartItem)
  declare cartItems: CartItem[];
}
