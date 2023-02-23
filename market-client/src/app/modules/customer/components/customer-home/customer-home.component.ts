import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styles: [],
})
export class CustomerHomeComponent implements OnInit {
  products: Array<Product> = [];
  inventory: Array<Inventory> = [];
  addedToCart: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAllProducts().subscribe({
      next: (allProducts) => {
        this.products = allProducts;

        this.customerService.getInventory().subscribe({
          next: (inv) => {
            this.inventory = inv;

            for (let p = 0; p < this.products.length; p++) {
              for (let i = 0; i < this.inventory.length; i++) {
                if (
                  this.products[p].id === this.inventory[i].product.id &&
                  this.inventory[i].quantity !== 0
                ) {
                  this.products[p].inStock = true;
                  break;
                }
              }
            }

          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }
}
