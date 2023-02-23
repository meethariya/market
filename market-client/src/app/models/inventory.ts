import { Product } from './product';

export class Inventory {
  id: number;
  product: Product;
  quantity: number;
  lastImportDate: Date;
  lastSoldDate: Date;

  constructor(
    id: number,
    product: Product,
    quantity: number,
    lastImportDate: Date,
    lastSoldDate: Date
  ) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.lastImportDate = lastImportDate;
    this.lastSoldDate = lastSoldDate;
  }
}
