import { Customer } from './customer';
import { Product } from './product';

export class Review {
  id: number;
  customer: Customer;
  product: Product;
  comment: string;
  rating: number;
  imagePath: string[];
  modifiedOn: Date;

  constructor(
    id: number,
    customer: Customer,
    product: Product,
    comment: string,
    rating: number,
    imagePath: string[],
    modifiedOn: Date
  ) {
    this.id = id;
    this.customer = customer;
    this.product = product;
    this.comment = comment;
    this.rating = rating;
    this.imagePath = imagePath;
    this.modifiedOn = modifiedOn;
  }
}
