import { Product } from './product';

/**
 * Inventory model.
 * Contains {@link id}?, {@link product}, {@link quantity}, {@link lastImportDate}, and {@link lastSoldDate}.
 * @see {@link Product}
 */
export class Inventory {
  id?: number;
  product: Product;
  quantity: number;
  lastImportDate?: Date;
  lastSoldDate?: Date;

  constructor(
    product: Product,
    quantity: number,
    lastImportDate?: Date,
    lastSoldDate?: Date,
    id?: number
  ) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    if (lastImportDate !== undefined) this.lastImportDate = lastImportDate;
    if (lastSoldDate !== undefined) this.lastSoldDate = lastSoldDate;
  }
}
