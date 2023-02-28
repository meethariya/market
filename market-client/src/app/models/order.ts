import { CartList } from './cart-list';
import { Customer } from './customer';

export class Order {
  public id: number;
  public customer: Customer;
  public timestamp: Date;
  public price: number;
  public paymentMethod: string;
  public cart: CartList[];

  constructor(
    id: number,
    customer: Customer,
    timestamp: Date,
    price: number,
    paymentMethod: string,
    cart: CartList[]
  ) {
    this.id = id;
    this.customer = customer;
    this.timestamp = timestamp;
    this.price = price;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
  }
}
