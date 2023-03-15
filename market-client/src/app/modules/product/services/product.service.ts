import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  isAuthenticated() {
    return this.generalService.isAuthenticated();
  }

  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product>(
      this.generalService.serverPath + '/product/' + id,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(
      this.generalService.serverPath + '/review/' + productId,
      { headers: this.generalService.headerGenerator() }
    );
  }
}
