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
    for (const cat of this.categories) {
      if (
        (
          document.getElementById(
            'check-category-' + cat.id
          ) as HTMLInputElement
        ).checked
      ) {
        for (const fixPro of this.fixedProducts) {
          if (fixPro.category.id === cat.id) {
            this.products.push(fixPro);
            if (!this.brands.includes(fixPro.brand))
              this.brands.push(fixPro.brand);
          }
        }
      }
    }

    this.emitProducts();
  }

  onBrandChange() {
    this.products = [];
    for (const element of this.brands) {
      if (
        (
          document.getElementById(
            'check-brand-' + element
          ) as HTMLInputElement
        ).checked
      ) {
        this.products = this.products.concat(
          this.fixedProducts.filter((p) => p.brand === element)
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
