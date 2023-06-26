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

/**
 * Customer Service. All data accessed by a customer is fetched from this service.  
 * Uses {@link GeneralService} for general activities.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  /**
   * Checks if the user logged in customer or not.
   * @see {@link GeneralService.roleVerifier()}
   * @returns promise boolean 
   */
  async isCustomer(): Promise<boolean> {
    return this.generalService.roleVerifier('Customer');
  }

  /**
   * Get all Products.  
   * @see {@link GeneralService.getAllProducts()}.
   * @returns Observale of Product List
   */
  getAllProducts(): Observable<Product[]> {
    return this.generalService.getAllProducts();
  }

  /**
   * Get all Inventory.  
   * @see {@link GeneralService.getInventory()}.
   * @returns Observale of Inventory List
   */
  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  /**
   * Get all Categories.  
   * @see {@link GeneralService.getCategory()}.
   * @returns Observale of Category List
   */
  getCategory(): Observable<Category[]> {
    return this.generalService.getCategory();
  }

  /**
   * Adds a product to the cart list of the customer logged in.
   * Backend Request: **POST** `/customer/cart`
   * @param cartData
   * @see {@link GeneralService.headerGenerator()}
   * @returns Id of the CartList added
   */
  addToCart(cartData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/customer/cart',
      cartData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Get Cart of the customer logged in.  
   * Backend Request: **GET** `/customer/cart`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observale of list of CartList
   */
  getCart(): Observable<CartList[]> {
    return this.http.get<CartList[]>(
      this.generalService.serverPath + '/customer/cart',
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Changes the quantity of the CartList item of the Customer logged in.  
   * Backend Request: **PUT** `/customer/cart`
   * @param cartItemId
   * @param quantityDiff
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of CartList
   */
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

  /**
   * Deletes CartList item of the Customer logged in.  
   * Backend Request: **DELETE** `/customer/cart`
   * @param id
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of id of the CartList deleted
   */
  removeCartitem(id: number): Observable<Number> {
    return this.http.delete<Number>(
      this.generalService.serverPath + '/customer/cart/' + id,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Profile details of the Customer logged in.  
   * Backend Request: **GET** `/customer/profile`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of Customer
   */
  getProfile(): Observable<Customer> {
    return this.http.get<Customer>(
      this.generalService.serverPath + '/customer/profile',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Place Order by the  Customer logged in.  
   * Backend Request: **POST** `/customer/order`
   * @param formData
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of id of the Order Placed
   */
  placeOrder(formData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/customer/order',
      formData,
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get all orders of the Customer logged in.  
   * Backend Request: **GET** `/customer/order`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of list of orders
   */
  getOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.generalService.serverPath + '/customer/order',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Edit Profile details of the Customer logged in.  
   * Backend Request: **PUT** `/customer/profile/[id]`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of Customer
   */
  editProfile(id: number, formData: FormData): Observable<Customer> {
    return this.http.put<Customer>(
      this.generalService.serverPath + '/customer/profile/' + id,
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Get all reviews of the Customer logged in.  
   * Backend Request: **GET** `/customer/review`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of list of reviews
   */
  getMyReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(
      this.generalService.serverPath + '/customer/review',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Add/Edit review for a product by the Customer logged in.  
   * Backend Request: **POST** `/customer/review`
   * @param formData
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of list of reviews
   */
  postReview(formData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/customer/review',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Delete a review for a product by the Customer logged in.  
   * Backend Request: **DELETE** `/customer/review`
   * @see {@link GeneralService.headerGenerator()}
   * @returns Observable of id of review deleted
   */
  deleteReview(reviewId: number): Observable<Number> {
    return this.http.delete<Number>(
      this.generalService.serverPath + '/customer/review/' + reviewId,
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Send Order receipt to mail.
   * Backend Request: **GET** `/customer/generateReceipt/{id}`
   * @see {@link GeneralService.headerGenerator()}
   * @returns boolean indicating whether the order receipt was sent successfully
   */
  generateReceipt(id: number | Number): Observable<boolean> {
    return this.http.get<boolean>(
      this.generalService.serverPath + '/customer/generateReceipt/' + id,
      { headers: this.generalService.headerGenerator() }
    );
  }
}
