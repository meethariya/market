import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { ReviewSortComponent } from './review-sort/review-sort.component';
import { ToasterComponent } from './toaster/toaster.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SmallDataComponent } from './small-data/small-data.component';

/**
 * Facet Modules. It has all the filters, search, Sort and toast components.
 */
@NgModule({
  declarations: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
    ToasterComponent,
    OrderFilterComponent,
    SmallDataComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
  ],
  exports: [
    FiltersComponent,
    SortComponent,
    SearchComponent,
    ReviewSortComponent,
    ToasterComponent,
    OrderFilterComponent,
    SmallDataComponent
  ],
})
export class FacetModule {}
