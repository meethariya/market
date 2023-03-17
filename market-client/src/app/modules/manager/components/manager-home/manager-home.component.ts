import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styles: [
    `
      #onHoverShow {
        display: none;
      }

      #addProductButton:hover #onHoverShow {
        display: block;
      }

      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class ManagerHomeComponent implements OnInit {
  p: number = 1;
  inventory: Inventory[] = [];
  fixedInventory: Inventory[] = [];
  products: Product[] = [];
  fixedProducts: Product[] = [];
  productListForSearching: Product[] = [];
  category: Category[] = [];
  brand: string[] = [];
  plus = faPlus;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getCategory().subscribe({
      next: (data) => (this.category = data),
      error: (err) => console.log(err),
    });

    this.managerService.getProducts().subscribe({
      next: (products) => {
        this.managerService.getInventory().subscribe({
          next: (data) => {
            products.forEach((i) => {
              if (!this.brand.includes(i.brand)) this.brand.push(i.brand);

              let found = false;
              for (const element of data) {
                if (element.product.id === i.id) {
                  found = true;
                  element.product.inStock = element.quantity > 0;
                  break;
                }
              }
              if (!found) {
                i.inStock = false;
                data.push(new Inventory(i, 0, undefined, undefined));
              }
            });
            this.inventory = data;
            this.fixedInventory = data;

            this.products = data.map((i) => i.product);
            this.fixedProducts = this.products;
            this.productListForSearching = this.products;
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }

  modifyProducts(allProducts: Product[]) {
    this.inventoryModifer(allProducts);
    this.products = allProducts;
    this.productListForSearching = allProducts;
  }

  searchedProducts(allProducts: Product[]) {
    this.inventoryModifer(allProducts);
    this.products = allProducts;
  }

  inventoryModifer(allProducts: Product[]) {
    this.inventory = [];
    allProducts.forEach((p) => {
      let temp = this.fixedInventory.find((i) => i.product.id === p.id);
      if (temp != null) this.inventory.push(temp);
    });
  }
}
