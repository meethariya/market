import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable, Subject, take } from 'rxjs';
import { Product } from 'src/app/models/product';
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
    return this.http.get<Product[]>(
      this.generalService.serverPath + '/product',
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  addToCart(cartData: FormData) {
    return this.http.post(this.generalService.serverPath + '/customer/cart', cartData, {
      headers: this.generalService.headerGenerator(),
    });
  }
}
