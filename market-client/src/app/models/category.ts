import { Product } from "./product";

/**
 * Category model.  
 * Contains {@link id} and {@link categoryName}
 * @see {@link Product}
 */
export class Category {
  id: number;
  categoryName: string;
  constructor(id: number, categoryName: string) {
    this.id = id;
    this.categoryName = categoryName;
  }
}
