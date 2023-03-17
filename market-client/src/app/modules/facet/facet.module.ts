import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { ReviewSortComponent } from './review-sort/review-sort.component';

@NgModule({
  declarations: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
  ],
})
export class FacetModule {}
