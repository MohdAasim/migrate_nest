import { Op } from 'sequelize';

export interface ProductFilters {
  [Op.or]?: Array<{
    name?: { [Op.like]: string };
    description?: { [Op.like]: string };
  }>;
  category?: string;
  price?: {
    [Op.between]?: [number, number];
    [Op.gte]?: number;
    [Op.lte]?: number;
  };
  rating?: {
    [Op.gte]: number;
  };
}
