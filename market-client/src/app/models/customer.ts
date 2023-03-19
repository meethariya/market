import { Address } from './address';
import { CartList } from './cart-list';
import { User } from './user';
import { Review } from './review';

/**
 * Customer model. 
 * Contains {@link id}, {@link user}, {@link address}, {@link gender}, {@link phone}, 
 * {@link dob} and {@link cart}
 * 
 * @see {@link User}, {@link Address}, {@link CartList}, {@link Review}
 */
export class Customer {
  public id: number;
  public user: User;
  public address: Address;
  public gender: boolean;
  public phone: string;
  public dob: Date;
  public cart: CartList[];
  
  constructor(
    id: number,
    user: User,
    address: Address,
    gender: boolean,
    phone: string,
    dob: Date,
    cart: CartList[]
  ) {
    this.id = id;
    this.user = user;
    this.address = address;
    this.gender = gender;
    this.phone = phone;
    this.dob = dob;
    this.cart = cart;
  }
}
