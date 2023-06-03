import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';

/**
 * Manager Service. All data accessed by a Manager is fetched from this service.  
 * Uses {@link GeneralService} for general activities.
 */
@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  /**
   * Checks whether logged in user is manager or not.  
   * @see {@link GeneralService.roleVerifier()}.
   * @returns promise boolean
   */
  async isManager(): Promise<boolean> {
    return this.generalService.roleVerifier('Manager');
  }

  /**
   * Get all Products.  
   * @see {@link GeneralService.getAllProducts()}.
   * @returns Observale of Product List
   */
  getProducts(): Observable<Product[]> {
    return this.generalService.getAllProducts();
  }

  /**
   * Get all category.  
   * @see {@link GeneralService.getCategory()}.
   * @returns Observale of category List
   */
  getCategory(): Observable<Category[]> {
    return this.generalService.getCategory();
  }

  /**
   * Get all inventory.  
   * @see {@link GeneralService.getInventory()}.
   * @returns Observale of inventory List
   */
  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  /**
   * Adds Item / n quantity of item to inventory.  
   * Backend Request: **POST** `/manager/inventory`
   * @param formData
   * @see {@link GeneralService.headerGenerator()}
   * @returns id of the item that has been added to inventory.
   */
  addInventory(formData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/manager/inventory',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Reduces n quantity of item in inventory.  
   * Backend Request: **POST** `/manager/reduceInventory`
   * @param formData
   * @see {@link GeneralService.headerGenerator()}
   * @returns id of the item that has been reduced from inventory stock.
   */
  reduceInventory(formData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/manager/reduceInventory',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Adds a product.  
   * Backend Request: **POST** `/manager/product`
   * @param formData
   * @see {@link GeneralService.headerGenerator()}
   * @returns id of the product added.
   */
  addProduct(formData: FormData): Observable<Number> {
    return this.http.post<Number>(
      this.generalService.serverPath + '/manager/product',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Get All Orders  
   * Backend Request: **POST** `/manager/order`
   * @see {@link GeneralService.headerGenerator()}
   * @returns id of the product added.
   */
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.generalService.serverPath + '/manager/order',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get all order count.
   * Backend Request: **GET** `/manager/orderCount`.
   * @returns number of all orders
   */
  getAllSalesCount(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/orderCount',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get all customer count.
   * Backend Request: **GET** `/manager/customerCount`.
   * @returns number of all customers
   */
  getCustomerCount(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/customerCount',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get all product count.
   * Backend Request: **GET** `/manager/productCount`.
   * @returns number of all products
   */
  getProductCount(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/productCount',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get sum of all order price.
   * Backend Request: **GET** `/manager/orderSumPrice`.
   * @returns total revenue
   */
  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/orderSumPrice',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Returns List of product rating rounded up to whole number and it's count.
   * Backend Request: **GET** `/manager/productCountByRating`.
   * @returns List of Rating and its count
   */
  getProductCountByRating(): Observable<
    { roundedRating: number; idCount: number }[]
  > {
    return this.http.get<{ roundedRating: number; idCount: number }[]>(
      this.generalService.serverPath + '/manager/productCountByRating',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Returns List of payment methods and how many times it has been used.  
   * Backend Request: **GET** `/manager/paymentMethodCount`.
   * @returns List of payment methods and its count
   */
  getPaymentMethodCount(): Observable<
    { method: string; count: number }[]
  > {
    return this.http.get<{ method: string; count: number }[]>(
      this.generalService.serverPath + '/manager/paymentMethodCount',
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get today's order count.
   * Backend Request: **GET** `/manager/todaySale`.
   * @returns number of orders placed today
   */
  getTodaySale(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/todaySale',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get order count this week.
   * Backend Request: **GET** `/manager/thisWeekSale`.
   * @returns number of orders placed this week
   */
  getThisWeekSale(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/thisWeekSale',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get order count this month.
   * Backend Request: **GET** `/manager/thisMonthSale`.
   * @returns number of orders placed this month
   */
  getThisMonthSale(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/thisMonthSale',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get order count this year.
   * Backend Request: **GET** `/manager/thisYearSale`.
   * @returns number of orders placed this year
   */
  getThisYearSale(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/thisYearSale',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get order of the highest price.  
   * Backend Request: **GET** `/manager/highestPriceOrder`.
   * @returns Order of highest price
   */
  getHighestPriceOrder(): Observable<Order> {
    return this.http.get<Order>(
      this.generalService.serverPath + '/manager/highestPriceOrder',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get average order price.  
   * Backend Request: **GET** `/manager/averagePriceOrder`.
   * @returns average order price
   */
  getAveragePriceOrder(): Observable<number> {
    return this.http.get<number>(
      this.generalService.serverPath + '/manager/averagePriceOrder',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get lowest order price.  
   * Backend Request: **GET** `/manager/lowestPriceOrder`.
   * @returns lowest order price
   */
  getLowestPriceOrder(): Observable<Order> {
    return this.http.get<Order>(
      this.generalService.serverPath + '/manager/lowestPriceOrder',
      { headers: this.generalService.headerGenerator() }
    );
  }
  
  /**
   * Get count of products sold grouped by category.  
   * Backend Request: **GET** `/manager/salesByCategory`.
   * @returns sales count by category
   */
  getSalesByCategory(): Observable<Map<string,number>> {
    return this.http.get<Map<string,number>>(
      this.generalService.serverPath + '/manager/salesByCategory',
      { headers: this.generalService.headerGenerator() }
    );
  }
}
