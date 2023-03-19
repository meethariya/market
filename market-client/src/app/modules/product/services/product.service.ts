import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { GeneralService } from 'src/app/services/general.service';

/**
 * Product Service. General data for product is fetched from this service.  
 * Uses {@link GeneralService} for general activities.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  /**
   * Checks whether user is authenticated or not. 
   * @see {@link GeneralService.isAuthenticated()}.
   * @returns `boolean`
   */
  isAuthenticated(): boolean {
    return this.generalService.isAuthenticated();
  }

  /**
   * Gets the product of given id.    
   * Backend Request: **GET** `/product/[id]`.  
   * @param id 
   * @see {@link GeneralService.headerGenerator()}
   * @returns `Observable<Product>`
   */
  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(
      this.generalService.serverPath + '/product/' + id,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  /**
   * Gets the product of given id.    
   * Backend Request: **GET** `/product/[id]`.  
   * @param productId 
   * @see {@link GeneralService.headerGenerator()}
   * @returns `Observable<Review[]>`
   */
  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      this.generalService.serverPath + '/review/' + productId,
      { headers: this.generalService.headerGenerator() }
    );
  }

  /**
   * Get Role of the active user. 
   * @see {@link GeneralService.getRole()}.
   * @returns `string`
   */
  getActiveRole(): string {
    let temp = this.generalService.getRole();
    return temp == null ? '' : temp;
  }

  /**
   * Get List of all categories
   * @see {@link GeneralService.getCategory()}.
   * @returns `Observable<Category[]>`
   */
  getCategory(): Observable<Category[]> {
    return this.generalService.getCategory();
  }

  /**
   * Edit Product details.  
   * Backend Request: **PUT** `/manager/product/[id]`.  
   * @param productId
   * @param formData 
   * @see {@link GeneralService.headerGenerator()}
   * @returns `Observable<Product>`
   */
  editProduct(productId: number, formData: FormData): Observable<Product> {
    return this.http.put<Product>(
      this.generalService.serverPath + '/manager/product/' + productId,
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }
}
