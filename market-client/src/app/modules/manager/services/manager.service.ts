import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  async isManager(): Promise<boolean> {
    return this.generalService.roleVerifier('Manager');
  }

  getProducts(): Observable<Product[]> {
    return this.generalService.getAllProducts();
  }

  getCategory(): Observable<Category[]> {
    return this.generalService.getCategory();
  }

  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  addInventory(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/manager/inventory',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  reduceInventory(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/manager/reduceInventory',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  addProduct(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/manager/product',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      this.generalService.serverPath + '/manager/order',
      { headers: this.generalService.headerGenerator() }
    );
  }
}
