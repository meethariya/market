import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [],
})
export class FiltersComponent {
  @Input() products!: Product[];
  @Input() categories!: Category[];
  @Input() brands!: string[];
  @Input() fixedProducts!: Product[];

  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();

  onCategoryChange() {
    this.products = [];
    this.brands = [];
    for (let i = 0; i < this.categories.length; i++) {
      if (
        (
          document.getElementById(
            'check-category-' + this.categories[i].id
          ) as HTMLInputElement
        ).checked
      ) {
        for (let j = 0; j < this.fixedProducts.length; j++) {
          if (this.fixedProducts[j].category.id === this.categories[i].id) {
            this.products.push(this.fixedProducts[j]);
            if (!this.brands.includes(this.fixedProducts[j].brand))
              this.brands.push(this.fixedProducts[j].brand);
          }
        }
      }
    }

    this.emitProducts();
  }

  onBrandChange() {
    this.products = [];
    for (let i = 0; i < this.brands.length; i++) {
      if (
        (
          document.getElementById(
            'check-brand-' + this.brands[i]
          ) as HTMLInputElement
        ).checked
      ) {
        this.products = this.products.concat(
          this.fixedProducts.filter((p) => p.brand === this.brands[i])
        );
      }
    }
    this.emitProducts();
  }

  onStockChange(event: Event) {
    this.onCategoryChange();
    this.onBrandChange();
    this.products = this.products.filter(
      (p) => p.inStock === (event.target as HTMLInputElement).checked
    );

    this.emitProducts();
  }

  resetFilters() {
    this.products = this.fixedProducts;
    this.categories.forEach(
      (c) =>
        ((
          document.getElementById('check-category-' + c.id) as HTMLInputElement
        ).checked = true)
    );
    this.onCategoryChange();
    this.brands.forEach(
      (b) =>
        ((
          document.getElementById('check-brand-' + b) as HTMLInputElement
        ).checked = true)
    );
    (document.getElementById('inStockSwitch') as HTMLInputElement).checked =
      true;
    this.emitProducts();
  }

  emitProducts() {
    this.productsEmitter.emit(this.products);
  }
}
