import { Component, Input } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartList } from 'src/app/models/cart-list';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styles: [
  ]
})
export class CartItemComponent {

  @Input() item!: CartList;

  plus = faPlus;
  minus = faMinus;

  constructor(private customerService:CustomerService){}

  cartItemQuantityEditor(quantityDiff: number){
    if(this.item.quantity<=0)return;
    
    this.item.quantity+=quantityDiff;

    this.customerService.cartItemQuantityEditor(this.item.id, quantityDiff).subscribe({
      next: (item) => this.item = item,
      error: (err) => console.log(err)
    });
  }
}
