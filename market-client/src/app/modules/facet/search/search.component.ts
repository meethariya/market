import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-search',
  template: `
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
  @Input() productList!: Product[];
  @Output() productsEmitter: EventEmitter<Product[]> = new EventEmitter();

  searchGroup = new FormGroup({
    searchValue: new FormControl(''),
  });

  ngOnInit(): void {
    this.searchGroup.get('searchValue')?.valueChanges.subscribe({
      next: (value) => {
        if (value == null) return;
        if (value.trim() === '') {
          this.productsEmitter.emit(this.productList);
        } else {
          this.productsEmitter.emit(
            this.productList.filter((p) =>
              p.name.toLowerCase().startsWith(value.toLowerCase())
            )
          );
        }
      },
      error: (err) => console.log(err),
    });
  }
}
