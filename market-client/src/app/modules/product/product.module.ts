import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    DetailProductComponent,
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxPaginationModule
  ]
})
export class ProductModule { }
