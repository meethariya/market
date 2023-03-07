import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [FiltersComponent, SortComponent, SearchComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FiltersComponent, SortComponent, SearchComponent],
})
export class FacetModule {}
