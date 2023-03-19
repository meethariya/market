import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

/**
 * Filter Component. This component filters out products from the list based on the 
 * `category`, `brand`, and `stock availability`.   
 * Used on **customer home** and **manager home** pages.  
 * Also provides option to reset all filters.
 */
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styles: [],
})
export class FiltersComponent {
  @Input() products!: Product[];             // List of modifying products by parent
  @Input() categories!: Category[];          // List of modifying categories by parent
  @Input() brands!: string[];                // List of modifying brand by parent
  @Input() fixedProducts!: Product[];        // List of Fixed Products by parent

  // Emits modified products after any filter process
  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();

  /**
   * When any category checkbox is modified, this method is called.  
   * It checks value of all {@link categories} and modified the {@link brands} and {@link product}.  
   * Emits the {@link products} after filtering.
   * @returns `void`
   */
  onCategoryChange(): void {
    // clears all products and brands.
    this.products = [];
    this.brands = [];
    for (const cat of this.categories) {
      // if category is unchecked, then remove all products and brands of that category.
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
    // emit
    this.emitProducts();
  }

  /**
   * When any brand checkbox is modified, this method is called.  
   * It check value of all {@link brands} and modifies the {@link products} accordingly.  
   * Emits {@link products} after filtering.
   * @returns `void`
   */
  onBrandChange(): void {
    // clears all products
    this.products = [];
    for (const element of this.brands) {
      // If brand checkbox is unchecked, all products of it will be removed.
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
    // emit
    this.emitProducts();
  }

  /**
   * When availablity switch is **enabled**, modifies product list such that only 
   * **available products** are filter. When **disabled**, only **unavailable products** are filtered.  
   * Emits {@link products} after filtering.
   * @param event 
   * @returns `void`
   */
  onStockChange(event: Event): void {
    // modify all category
    this.onCategoryChange();
    // modify all brand
    this.onBrandChange();
    // Filter only available/unavailable products
    this.products = this.products.filter(
      (p) => p.inStock === (event.target as HTMLInputElement).checked
    );

    // emit
    this.emitProducts();
  }

  /**
   * Resets all filters on {@link products}, {@link categories}, {@link brands} and availablity.  
   * Set them according to the {@link fixedProducts}.  
   * Emits the filled {@link products} after setting everything as initial values.
   * @returns `void`
   */
  resetFilters(): void {
    // reset products
    this.products = this.fixedProducts;

    // reset categories
    this.categories.forEach(
      (c) =>
        ((
          document.getElementById('check-category-' + c.id) as HTMLInputElement
        ).checked = true)
    );
    this.onCategoryChange();

    // reset brands
    this.brands.forEach(
      (b) =>
        ((
          document.getElementById('check-brand-' + b) as HTMLInputElement
        ).checked = true)
    );
    // reset availability switch
    (document.getElementById('inStockSwitch') as HTMLInputElement).checked =
      true;

    // emit
    this.emitProducts();
  }

  /**
   * Emits the {@link products} back to parent.
   * @returns `void`
   */
  emitProducts(): void {
    this.productsEmitter.emit(this.products);
  }
}
