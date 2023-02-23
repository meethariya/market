import { Product } from './product';

export class CartList {
  id: number;
  addedOn: Date;
  quantity: number;
  product: Product;

  constructor(id: number, addedOn: Date, quantity: number, product: Product) {
    this.id = id;
    this.addedOn = addedOn;
    this.quantity = quantity;
    this.product = product;
  }
}
