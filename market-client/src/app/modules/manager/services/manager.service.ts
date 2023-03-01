import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/models/inventory';
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

  getInventory(): Observable<Inventory[]> {
    return this.generalService.getInventory();
  }

  addInventory(formData: FormData) {
    return this.http.post(this.generalService.serverPath + '/manager/inventory', formData, {
      headers: this.generalService.headerGenerator(),
    });
  }
}
