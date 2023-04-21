import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from '../../services/product.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { ReviewSortComponent } from 'src/app/modules/facet/review-sort/review-sort.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { environment } from 'src/environments/environment';

/**
 * Shows product details to authenticated user.  
 * Fetches product id from `path url` and works on it.  
 * Shows all reviews of the product.  
 * Shows Toast on any error message.  
 * If active role is manager, shows option to edit the product details.  
 * Contains {@link EditProductComponent}  
 * App Route Link: `/product/*`
 */
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class DetailProductComponent implements OnInit {
  id!: number;              // product id fetched from the url

  p: number = 1;            // pagination page number
  product!: Product;        // Product using the id
  reviews: Review[] = [];   // all reviews for the product
  // array for indivial star rating count 1 star=0th index, 2 star=1st index,....
  starCountArray = [0, 0, 0, 0, 0];
  activeRole: string = '';  // authenticated user's role
  pencil = faPencil;        // Edit Icon
  seperator = environment.seperator;      // seperator based on OS
  // toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  /**
   * Fetches product id from url.  
   * Fetches product details using the id {@link productService.getProductDetails()}.    
   * Fetches the product reviews using {@link productService.getProductReviews()}.  
   * Fetches authenticated user's role using {@link productService.getActiveRole()}.  
   * In case of any error, shows toast.  
   * @returns `void`
   */
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductDetails(this.id).subscribe({
      next: (value) => (this.product = value),
      error: (err) => this.toastLoader(false,err.error),
    });

    this.productService.getProductReviews(this.id).subscribe({
      next: (data) => {
        this.reviews = data;
        // sets starArrayCountBased on the ratings.
        data.forEach((r) => (this.starCountArray[r.rating - 1] += 1));
      },
      error: (err) => this.toastLoader(false,err.error),
    });

    this.activeRole = this.productService.getActiveRole();
  }

  /**
   * Sorts review based on the emitter by {@link ReviewSortComponent}
   * @param reviews 
   * @returns `void`
   */
  sortReviews(reviews: Review[]): void {
    this.reviews = reviews;
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status:boolean, message:string) {
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

  /**
   * Toasts message after product editing.
   * @param data 
   * @returns `void`
   */
  productToToaster(data: {status: boolean, message: string, product?: Product}){
    if(data.status){
      this.product = data.product!;
    }
    // show toast
    this.toastLoader(data.status, data.message);
  }
}
