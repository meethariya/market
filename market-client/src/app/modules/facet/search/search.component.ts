import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';

/**
 * Search Component. This component is used to search products starting with {@link searchGroup}
 * from the {@link productList}.  
 * Actively looks for any changes to the search bar value, and keeps updating it.  
 * Emits {@link productList} back to parent after filtering with search.
 */
@Component({
  selector: 'app-search',
  template: `
    <!-- Search Bar -->
    <div class="my-2" [formGroup]="searchGroup">
      <input
        class="form-control rounded-pill px-4"
        type="text"
        placeholder="Search"
        aria-label="Search Bar"
        id="searchBar"
        formControlName="searchValue"
      />
    </div>
  `,
  styles: [],
})
export class SearchComponent implements OnInit {
  @Input() productList!: Product[];             // Product list input by parent
  // Emit searched product list
  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();

  // search value
  searchGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  /**
   * Actively looks for changes in the search bar and updates {@link productList}.  
   * Emits changes immediately.
   * @returns `void`
   */
  ngOnInit(): void {
    this.searchGroup.get('searchValue')?.valueChanges.subscribe({
      next: (value) => {
        // if search value is null, ignore the call
        if (value == null) return;
        // if search value contains no characters, emit the existing product list
        if (value.trim() === '') {
          this.productsEmitter.emit(this.productList);
        } else {
        // else filter products from the list starting from searched value.
        // Emit the list
          this.productsEmitter.emit(
            this.productList.filter((p) =>
              p.name.toLowerCase().startsWith(value.toLowerCase())
            )
          );
        }
      },
      // if any errors
      error: (err) => console.log(err),
    });
  }
}
