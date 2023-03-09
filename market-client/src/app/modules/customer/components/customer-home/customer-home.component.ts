import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class CustomerHomeComponent implements OnInit {
  p: number = 1;
  products: Product[] = [];
  fixedProducts: Product[] = [];
  productListForSearching: Product[] = [];
  inventory: Inventory[] = [];

  categories: Category[] = [];
  brands: string[] = [];

  addedToCart: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCategory().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.log(err),
    });

    this.customerService.getAllProducts().subscribe({
      next: (allProducts) => {
        this.products = allProducts;
        this.fixedProducts = allProducts;
        this.productListForSearching = allProducts;

        this.customerService.getInventory().subscribe({
          next: (inv) => {
            this.inventory = inv;

            for (let p = 0; p < this.products.length; p++) {
              if (!this.brands.includes(this.products[p].brand))
                this.brands.push(this.products[p].brand);

              let found = false;
              for (let i = 0; i < this.inventory.length; i++) {
                if (
                  this.products[p].id === this.inventory[i].product.id &&
                  this.inventory[i].quantity !== 0
                ) {
                  this.products[p].inStock = true;
                  found = true;
                  break;
                }
              }
              if (!found) this.products[p].inStock = false;
            }
          },

          error: (err) => console.log(err),
        });
      },

      error: (err) => console.log(err),
    });
  }

  modifyProducts(allProducts: Product[]) {
    this.products = allProducts;
    this.productListForSearching = allProducts;
  }

  searchedProducts(allProducts: Product[]) {
    this.products = allProducts;
  }
}
