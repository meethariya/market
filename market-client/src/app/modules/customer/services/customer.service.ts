import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartList } from 'src/app/models/cart-list';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Inventory } from 'src/app/models/inventory';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  async isCustomer(): Promise<boolean> {
    return this.generalService.roleVerifier('Customer');
  }

  getAllProducts(): Observable<Product[]> {
    return this.generalService.getAllProducts();
  }

  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  getCategory(): Observable<Category[]> {
    return this.generalService.getCategory();
  }

  addToCart(cartData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/customer/cart',
      cartData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  getCart(): Observable<CartList[]> {
    return this.http.get<CartList[]>(
      this.generalService.serverPath + '/customer/cart',
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  cartItemQuantityEditor(
    cartItemId: number,
    quantityDiff: number
  ): Observable<CartList> {
    let temp: FormData = new FormData();
    temp.set('cartListId', cartItemId.toString());
    temp.set('quantity', quantityDiff.toString());
    return this.http.put<CartList>(
      this.generalService.serverPath + '/customer/cart',
      temp,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  removeCartitem(id: number): Observable<any> {
    return this.http.delete(
      this.generalService.serverPath + '/customer/cart/' + id,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  getProfile(): Observable<Customer> {
    return this.http.get<Customer>(
      this.generalService.serverPath + '/customer/profile',
      { headers: this.generalService.headerGenerator() }
    );
  }

  placeOrder(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/customer/order',
      formData,
      { headers: this.generalService.headerGenerator() }
    );
  }

  getOrder() {
    return this.http.get<Order[]>(
      this.generalService.serverPath + '/customer/order',
      { headers: this.generalService.headerGenerator() }
    );
  }

  editProfile(id: number, formData: FormData): Observable<Customer> {
    return this.http.put<Customer>(
      this.generalService.serverPath + '/customer/profile/' + id,
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  getMyReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(
      this.generalService.serverPath + '/customer/review',
      { headers: this.generalService.headerGenerator() }
    );
  }

  postReview(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/customer/review',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  deleteReview(reviewId: number) {
    return this.http.delete(
      this.generalService.serverPath + '/customer/review/' + reviewId,
      { headers: this.generalService.headerGenerator() }
    );
  }
}
