import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .carousel .carousel-item {
        height: 500px;
      }

      .carousel-item img {
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        min-height: 500px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor(
    private generalService: GeneralService,
    private customerService: CustomerService,
    private router: Router
  ) {
    
  }
  async ngOnInit(): Promise<void> {
    // if logged in, avoids user to go to home page
    if (this.generalService.isAuthenticated()) {
      // goes to role based home page.
      if (await this.customerService.isCustomer()) {
        this.router.navigate(['customer']);
      } else {
        this.router.navigate(['manager']);
      }
    }
  }
}
