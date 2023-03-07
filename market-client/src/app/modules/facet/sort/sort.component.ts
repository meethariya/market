import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

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

  @Input() products!: Product[];
  
  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();
  
  onSortByChange($event: Event) {
    const userValue = ($event.target as HTMLInputElement).value;
    switch (userValue) {
      case '1':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case '2':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case '3':
        this.products.sort((a, b) => {
          let textA:string = a.name.toUpperCase();
          let textB:string = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
        break;
      case '4':
        this.products.sort((a, b) => {
          let textA:string = a.name.toUpperCase();
          let textB:string = b.name.toUpperCase();
          return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
      });
        break;
      case '5':
        this.products.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    this.productsEmitter.emit(this.products);
  }
}
