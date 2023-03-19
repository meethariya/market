import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { CustomerService } from '../../services/customer.service';
import { FiltersComponent } from 'src/app/modules/facet/filters/filters.component';
import { SortComponent } from 'src/app/modules/facet/sort/sort.component';
import { SearchComponent } from 'src/app/modules/facet/search/search.component';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';
import { ProductComponent } from '../product/product.component';

/**
 * CustomerHome component. This component is loaded as home page for customer.  
 * It contains {@link FiltersComponent}, {@link SearchComponent}, {@link SortComponent} ,
 * {@link ProductComponent} and {@link ToasterComponent}.  
 * It contains list of all products. Customer can add it to their cart. Each product is made of {@link ProductComponent}  
 * Customer can apply filters, search and sorting on list of available products.  
 * App route link: `/customer/`
 */
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
  p: number = 1;                            // Pagination page number
  products: Product[] = [];                 // product list visible on screen
  fixedProducts: Product[] = [];            // never changing product list
  productListForSearching: Product[] = [];  // product list for searching
  inventory: Inventory[] = [];              // inventory list

  categories: Category[] = [];              // list of unique categories
  brands: string[] = [];                    // list of unique products

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(private customerService: CustomerService) {}

  /**
   * Sets list of categories.  
   * Fills unique brand names.  
   * Fetches all products and inventories. Iterates through each product and inventory.
   * If Found and available stock is `< 1` sets, the product `inStock` variable to false.  
   * Toasts if any error is encountered.
   * 
   * @see {@link CustomerService.getCategory()}, {@link CustomerService.getAllProducts()},
   *  {@link CustomerService.getInventory()}
   */
  ngOnInit(): void {
    // sets list of unique categories to pass it to filter component.
    this.customerService.getCategory().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => this.showToast({status:false, message:err.error}),
    });

    // fetch all products
    this.customerService.getAllProducts().subscribe({
      next: (allProducts) => {
        // set all product lists.
        this.products =
          this.fixedProducts =
          this.productListForSearching =
            allProducts;

        // fetch all inventory items
        this.customerService.getInventory().subscribe({
          next: (inv) => {
            // set inventory list
            this.inventory = inv;

            // for each product fill unique brand name in list
            for (const product of this.products) {
              this.fillBrand(product.brand);

              let found = false;          // setting inStock of Product class
              // find product in each inventory item. If not found create new inventory for it.
              for (const inv of this.inventory) {
                if (product.id === inv.product.id && inv.quantity !== 0) {
                  // if product is found and stock is available show in stock
                  product.inStock = true;
                  found = true;
                  break;
                }
              }
              // else show out of stock
              if (!found) product.inStock = false;
            }
          },
          // toast any error
          error: (err) => this.showToast({status:false, message:err.error}),
        });
      },
      // toast any error
      error: (err) => this.showToast({status:false, message:err.error}),
    });
  }

  /**
   * Modifies the product list and the list available for searching.
   * This method is called by {@link FiltersComponent.emitProducts()} or 
   * {@link SortComponent.onSortByChange()}
   * @param allProducts 
   */
  modifyProducts(allProducts: Product[]): void {
    this.products = allProducts;
    this.productListForSearching = allProducts;
  }

  /**
   * Modifies the product list based on the search value.  
   * This method is called by {@link SearchComponent.productsEmitter}.
   * @param allProducts 
   */
  searchedProducts(allProducts: Product[]): void {
    this.products = allProducts;
  }

  // fills unique brands into brand list
  fillBrand(brand: string): void {
    if (!this.brands.includes(brand)) this.brands.push(brand);
  }

  /**
   * Sets all the properties for the toast, and finally sets it's ready to true to activate it.
   * 
   * @param status 
   * @param message 
   * 
   * @see {@link ToasterComponent.ngOnChanges()}
   */
  showToast(data: { status: boolean; message: string }): void {
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
