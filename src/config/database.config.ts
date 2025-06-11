import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';
import { CartItem } from '../entities/cart.entity';

export const databaseConfigFactory = (
  configService: ConfigService,
): SequelizeModuleOptions => {
  return {
    dialect: 'mysql',
    host: configService.get('DB_HOST') || 'localhost',
    port: parseInt(configService.get('DB_PORT') || '3306'),
    username: configService.get('DB_USER') || 'root',
    password: configService.get('DB_PASSWORD') || '',
    database: configService.get('DB_NAME') || 'nest_auth_db',
    models: [User, Product, CartItem],
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  };
};
