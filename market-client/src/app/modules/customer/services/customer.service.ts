import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable, Subject, take } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private generalService:GeneralService) {}

  async isCustomer(): Promise<boolean> {
    return this.generalService.roleVerifier("Customer");
  }

}
