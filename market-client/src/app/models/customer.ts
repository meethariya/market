import { Address } from './address';
import { CartList } from './cart-list';
import { User } from './user';

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
