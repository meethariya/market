import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { ManagerService } from '../../services/manager.service';
import { InventoryItemComponent } from '../inventory-item/inventory-item.component';
import { FiltersComponent } from 'src/app/modules/facet/filters/filters.component';
import { SearchComponent } from 'src/app/modules/facet/search/search.component';
import { SortComponent } from 'src/app/modules/facet/sort/sort.component';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';

/**
 * Manager Home Component.
 * First page to be shown to manager after login.  
 * It contains list of {@link inventory} to be shown using {@link InventoryItemComponent}  
 * It contains {@link FiltersComponent}, {@link SearchComponent}, {@link SortComponent} and
 * {@link ToasterComponent}.  
 * App route link: `/manager`
 */
@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styles: [
    `
      /* When add button is hover, hide it and show full button */
      #onHoverShow {
        display: none;
      }

      /* When add button is hover, hide it and show full button */
      #addProductButton:hover #onHoverShow {
        display: block;
      }

      /* pagination */
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class ManagerHomeComponent implements OnInit {
  p: number = 1;                              // pagination page number
  inventory: Inventory[] = [];                // list of inventory (modifiable)
  fixedInventory: Inventory[] = [];           // list of fixed Inventory
  products: Product[] = [];                   // list of products for facets
  fixedProducts: Product[] = [];              // list of fixed Products for facets
  productListForSearching: Product[] = [];    // list of products for facets
  category: Category[] = [];                  // list of categories for facets
  brand: string[] = [];                       // list of brand for facets
  plus = faPlus;                              // Plus Icon

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private managerService: ManagerService) {}

  /**
   * Loads list of category using {@link ManagerService.getCategory()}.  
   * Loads list of products using {@link ManagerService.getProducts()}.  
   * Loads list of inventory items using {@link ManagerService.getInventory()}.  
   * Fills Unique brand list from {@link products}.  
   * If product is not found in list of inventory, creates new inventory to give manager 
   * option to add that product to stock.  
   * 
   * @returns `void`
   */
  ngOnInit(): void {
    // load categories
    this.managerService.getCategory().subscribe({
      next: (data) => (this.category = data),
      error: (err) => this.toastLoader(false,err.error),
    });

    // load products
    this.managerService.getProducts().subscribe({
      next: (products) => {
        // load inventory
        this.managerService.getInventory().subscribe({
          next: (data) => {
            products.forEach((i) => {
              // if brand is not in brandList, add it
              if (!this.brand.includes(i.brand)) this.brand.push(i.brand);

              // If product is not in inventory list or ites quantity is -ve,
              // create new inventory for it
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
            // set all other varaibles for facets to work properly.
            this.inventory = data;
            this.fixedInventory = data;

            this.products = data.map((i) => i.product);
            this.fixedProducts = this.products;
            this.productListForSearching = this.products;
          },
          // toast on error
          error: (err) => this.toastLoader(false, err.error),
        });
      },
      // toast on error
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Emitted product list from {@link FiltersComponent}, {@link SortComponent}.  
   * Convert those to inventory and display applicable items.
   * 
   * @param allProducts 
   * @returns `void`
   */
  modifyProducts(allProducts: Product[]): void {
    this.inventoryModifer(allProducts);
    this.products = allProducts;
    this.productListForSearching = allProducts;
  }

  /**
   * Emitted product list from {@link SearchComponent}.  
   * Convert those to inventory and display applicable items.
   * 
   * @param allProducts 
   * @returns `void`
   */
  searchedProducts(allProducts: Product[]): void {
    this.inventoryModifer(allProducts);
    this.products = allProducts;
  }

  /**
   * Converts product list to inventory list.
   * @param allProducts 
   * @returns `void`
   */
  inventoryModifer(allProducts: Product[]): void {
    this.inventory = [];
    allProducts.forEach((p) => {
      let temp = this.fixedInventory.find((i) => i.product.id === p.id);
      if (temp != null) this.inventory.push(temp);
    });
  }

  /**
   * Emitted status and message from {@link InventoryItemComponent} shown using toast
   * @param data 
   * @returns `void`
   */
  stockQuantityToToast(data: {status:boolean, message:string}): void {
    this.toastLoader(data.status, data.message);
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status:boolean, message:string): void {
    if (status) {
      this.toastTitle = 'Success';
      this.toastColorClass = 'success';
    } else {
      this.toastTitle = 'Failed';
      this.toastColorClass = 'danger';
    }
    this.toastMessage = message;
    this.toastReady = true;
  }
}
