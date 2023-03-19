import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { FacetModule } from '../facet/facet.module';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';


/**
 * Product Module.  
 * Some general functionalities of Product belongs to this module.
 */
@NgModule({
  declarations: [
    DetailProductComponent,
    StarRatingComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FacetModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports:[
    StarRatingComponent
  ]
})
export class ProductModule { }
