import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
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
    return this.http.get<Category[]>(
      this.generalService.serverPath + '/manager/category',
      {
        headers: this.generalService.headerGenerator(),
      }
    );
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

  addProduct(formData: FormData) {
    return this.http.post(
      this.generalService.serverPath + '/manager/product',
      formData,
      {
        headers: this.generalService.headerGenerator(),
      }
    );
  }
}
