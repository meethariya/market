import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() reducer: EventEmitter<number> = new EventEmitter();
  @Output() increaser: EventEmitter<number> = new EventEmitter();

  plus = faPlus;
  minus = faMinus;

  constructor(private customerService:CustomerService){}

  reduceCartItem() {
    if(this.item.quantity<=1)return;
    this.item.quantity-=1;
    // this.reducer.emit(this.item.id);
    this.customerService.cartItemQuantityEditor(this.item.id, -this.item.quantity);
  }
  
  increaseCartItem() {
    this.item.quantity+=1;
    // this.increaser.emit(this.item.id);
    this.customerService.cartItemQuantityEditor(this.item.id, this.item.quantity);
  }
}
