import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

/**
 * Sorts a list of products by  
 * 1. Price
 * 2. Name
 * 3. Rating
 * 
 * Emits products list after sorting.
 */
@Component({
  selector: 'app-sort',
  template: `
    <!--Sort by-->
    <div class="my-2">
      <select
        class="form-select"
        aria-label="Sort By"
        (change)="onSortByChange($event)"
      >
        <option selected disabled>Sort By</option>
        <option value="1">Price: High-Low</option>
        <option value="2">Price: Low-High</option>
        <option value="3">Name: A-Z</option>
        <option value="4">Name: Z-A</option>
        <option value="5">Rating</option>
      </select>
    </div>
  `,
  styles: [],
})
export class SortComponent {

  @Input() products!: Product[];          // Product list input by parent

  // emit products
  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();
  
  /**
   * Sorts {@link products} when the select menu is changed.  
   * Emits the list after sorting it.
   * 
   * @param $event 
   * @returns `void`
   */
  onSortByChange($event: Event): void {
    // Select value
    const userValue = ($event.target as HTMLInputElement).value;
    switch (userValue) {
      // sort by price High-Low
      case '1':
        this.products.sort((a, b) => b.price - a.price);
        break;
      // sort by price Low-High
      case '2':
        this.products.sort((a, b) => a.price - b.price);
        break;
      // sort by name A-Z
      case '3':
        this.products.sort((a, b) => {
          let textA:string = a.name.toUpperCase();
          let textB:string = b.name.toUpperCase();
          let temp = (textA > textB) ? 1 : 0;
          return (textA < textB) ? -1 : temp;
      });
        break;
      // sort by name Z-A
      case '4':
        this.products.sort((a, b) => {
          let textA:string = a.name.toUpperCase();
          let textB:string = b.name.toUpperCase();
          let temp = (textB > textA) ? 1 : 0;
          return (textB < textA) ? -1 : temp;
      });
        break;
      // sort by Rating High-Low
      case '5':
        this.products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    // emit products list
    this.productsEmitter.emit(this.products);
  }
}
