import { CartList } from './cart-list';
import { Customer } from './customer';
import { Product } from './product';

/**
 * Order model.
 * Contains {@link id}, {@link customer}, {@link timestamp}, {@link price}, {@link paymentMethod}, and
 * {@link cart}.
 * @see {@link CartList}, {@link Customer}, {@link Product}
 */
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
