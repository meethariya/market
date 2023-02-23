import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/models/inventory';
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
    return this.generalService.getAllProducts();
  }

  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  addToCart(cartData: FormData) {
    return this.http.post(this.generalService.serverPath + '/customer/cart', cartData, {
      headers: this.generalService.headerGenerator(),
    });
  }
}
