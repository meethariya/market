import { Component, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent {
  @Input() product!: Product;
  
  successEmit() {
    // TODO: display success alert message in customer home. 
  }
}
