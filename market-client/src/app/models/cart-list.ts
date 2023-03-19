import { Product } from './product';
import { Customer } from './customer';
import { Order } from './order';
/**
 * CartList model.  
 * Contains {@link id}, {@link addedOn}, {@link quantity} and {@link product}.
 * 
 * @see {@link Product}, {@link Order}, {@link Customer}
 */
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
