import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { CustomerService } from '../../services/customer.service';
import { Toast } from 'bootstrap';

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

  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCategory().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.log(err),
    });

    this.customerService.getAllProducts().subscribe({
      next: (allProducts) => {
        this.products =
          this.fixedProducts =
          this.productListForSearching =
            allProducts;

        this.customerService.getInventory().subscribe({
          next: (inv) => {
            this.inventory = inv;

            for (const product of this.products) {
              this.fillBrand(product.brand);

              let found = false;
              for (const inv of this.inventory) {
                if (product.id === inv.product.id && inv.quantity !== 0) {
                  product.inStock = true;
                  found = true;
                  break;
                }
              }
              if (!found) product.inStock = false;
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

  fillBrand(brand: string) {
    if (!this.brands.includes(brand)) this.brands.push(brand);
  }

  showToast(data: { status: boolean; message: string }) {
    if (data.status) {
      this.toastTitle = 'Success';
      this.toastColorClass = 'success';
    } else {
      this.toastTitle = 'Failed';
      this.toastColorClass = 'danger';
    }
    this.toastMessage = data.message;
    this.toastReady = true;
  }
}
