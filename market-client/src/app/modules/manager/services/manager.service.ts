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
}
