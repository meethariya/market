import { Component, OnInit } from '@angular/core';
import { CartList } from 'src/app/models/cart-list';
import { CustomerService } from '../../services/customer.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { CustomerHomeComponent } from '../customer-home/customer-home.component';

/**
 * Cart component. This component shows list of cart items of the user logged in.  
 * It contains a list of {@link CartItemComponent} that can be used to delete a cart item, 
 * or modify its quantity.  
 * Based on the functions, It shows toasts using the {@link ToasterComponent}  
 * Can be used to place an order i.e. routing to {@link PlaceOrderComponent} (`/customer/cart/place-order`)  
 * Can route to {@link CustomerHomeComponent}(`/customer/`) if customer has no items in the cart.  
 * App route link: `/customer/cart`
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  p: number = 1; // pagination page number
  cart: CartList[] = []; // List of Cart

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private customerService: CustomerService) {}

  /**
   * get cart list of customer logged in from {@link CustomerService.getCart()} 
   * and set it to {@link cart}.  
   * Show toast on error.
   */
  ngOnInit(): void {
    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => (this.cart = data),
      error: (err) => this.toastModifier(false, err.error),
    });
  }

  /**
   * Deletes item from the cart.
   * This method is called by {@link CartItemComponent.removeFromCart()}.
   * Shows toast for success/failure.
   *
   * @param data
   * @return void
   */
  removeItem(data: {
    status: boolean;
    message: string;
    item?: CartList;
  }): void {
    // if removed successfully then remove the cartItem from the list
    if (data.status)
      this.cart = this.cart.filter((i) => i.id !== data.item!.id);
    // show toast
    this.toastModifier(data.status, data.message);
  }

  /**
   * Modifies the quantity of cart item, and shows the toast.
   * This method is called by {@link CartItemComponent.cartItemQuantityEditor()}
   * @param data
   * @return void
   */
  modifyCartQuantity(data: { status: boolean; message: string }): void {
    // show toast
    this.toastModifier(data.status, data.message);
  }

  /**
   * Sets all the properties for the toast, and finally sets it's ready to true to activate it.
   * 
   * @param status 
   * @param message 
   * 
   * @see {@link ToasterComponent.ngOnChanges()}
   */
  toastModifier(status: boolean, message: string): void  {
    if (status) {
      this.toastTitle = 'Success';
      this.toastColorClass = 'success';
    } else {
      this.toastTitle = 'Failed';
      this.toastColorClass = 'danger';
    }
    this.toastMessage = message;
    this.toastReady = true;
  }
}
