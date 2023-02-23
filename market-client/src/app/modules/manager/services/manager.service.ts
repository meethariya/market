import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient, private generalService: GeneralService) {}

  async isManager(): Promise<boolean> {
    return this.generalService.roleVerifier("Manager");
  }

}
