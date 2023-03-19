import { Category } from './category';
import { Inventory } from './inventory';

/**
 * Product model.
 * Contains {@link id}, {@link name}, {@link brand}, {@link category}, {@link price},
 *  {@link rating}, {@link imagePath}, and {@link inStock}?.
 * 
 * @see {@link Category}, {@link Inventory}
 */
export class Product {
  id: number;
  name: string;
  brand: string;
  category: Category;
  price: number;
  rating: number;
  imagePath: string[];
  inStock?: boolean=false;

  constructor(
    id: number,
    name: string,
    brand: string,
    category: Category,
    price: number,
    rating: number,
    imagePath: string[]
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.imagePath = imagePath;
  }
}
