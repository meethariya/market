import { Component, OnInit } from '@angular/core';
import { CartList } from 'src/app/models/cart-list';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from '../../services/customer.service';

/**
 * Place Order component. This component is responsible for placing customer's cart list as order.
 * Asks Payment Method and submits details using {@link CustomerService.placeOrder()}.
 * App Route link: `/customer/cart/place-order`
 */
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styles: [],
})
export class PlaceOrderComponent implements OnInit {
  cart!: CartList[]; // Cart List
  customer!: Customer; // Customer Details

  payment!: string; // Payment method
  // Dropdown menu for select
  paymentOptions = [
    { id: 'UPI', name: 'UPI' },
    { id: 'NetBanking', name: 'NetBanking' },
    { id: 'COD', name: 'Cash On Delivery' },
  ];

  total: number = 0; // Total Cost

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private customerService: CustomerService) {}

  /**
   * Loads Customer Profile Details using {@link CustomerService.getProfile()}.  
   * Loads Customer Cart Details using {@link CustomerService.getCart()}, and calculate total cost.  
   * Shows Error toast if any error occurs.
   * @returns `void`
   */
  ngOnInit(): void {
    this.customerService.getProfile().subscribe({
      next: (c) => (this.customer = c),
      error: (err) => this.toastLoader(false, err.error),
    });

    this.customerService.getCart().subscribe({
      next: (data: CartList[]) => {
        this.cart = data;
        this.cart.forEach((i) => (this.total += i.product.price * i.quantity));
      },
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Place an order. This method is called when the form is `submitted`.  
   * Uses {@link  CustomerService.placeOrder()} to place order.  
   * Shows toast status and message on success/failure, using {@link ToasterComponent}.  
   * Resets all vaules and empties customer cart when order is placed successfully.  
   * @returns `void`
   */
  order(): void {
    let formData: FormData = new FormData();
    if (this.payment != null) formData.set('payment', this.payment);
    this.customerService.placeOrder(formData).subscribe({
      // on success
      next: (id) => {
        this.toastLoader(true, 'Order Places Successfully!');
        this.cart = [];
        this.total = 0;
        this.payment = '';
      },
      // on failure
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status: boolean, message: string) {
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
