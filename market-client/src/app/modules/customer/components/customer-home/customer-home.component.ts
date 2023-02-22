import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styles: [],
})
export class CustomerHomeComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.log(err),
    });
  }

  successEmit(){}
}
