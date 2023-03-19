import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { GeneralService } from 'src/app/services/general.service';
import * as Aos from 'aos';

/**
 * Home Component. The first component to be displayed on the screen.   
 * If user is logged in then this page will **redirect** to the role based home page.  
 * Uses {@link Aos} to display zigzag animation content.  
 * App route link: `/`
 * 
 * @see {@link GeneralService.isAuthenticated()}  
 * @see {@link CustomerService.isCustomer()}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      /* Carousal item height fix for home page */
      .carousel .carousel-item {
        height: 500px;
      }

      /* Carousal item image height fix for home page */
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
  ) {}
  async ngOnInit(): Promise<void> {
    // if logged in, avoids user to go to home page
    Aos.init();
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
