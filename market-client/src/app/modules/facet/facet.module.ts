import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { ReviewSortComponent } from './review-sort/review-sort.component';
import { ToasterComponent } from './toaster/toaster.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
    ToasterComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
    ToasterComponent,
  ],
})
export class FacetModule {}
