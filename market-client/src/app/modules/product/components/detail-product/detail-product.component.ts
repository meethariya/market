import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from '../../services/product.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

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
  id!: number;

  p: number = 1;
  product!: Product;
  reviews: Review[] = [];
  // array for indivial star rating count 1 star=0th index, 2 star=1st index,....
  starCountArray = [0, 0, 0, 0, 0];
  activeRole: string = '';
  pencil = faPencil;

  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductDetails(this.id).subscribe({
      next: (value) => (this.product = value),
      error: (err) => this.toastLoader(false,err.error),
    });
    this.productService.getProductReviews(this.id).subscribe({
      next: (data) => {
        this.reviews = data;
        data.forEach((r) => (this.starCountArray[r.rating - 1] += 1));
      },
      error: (err) => this.toastLoader(false,err.error),
    });
    this.activeRole = this.productService.getActiveRole();
  }

  sortReviews(reviews: Review[]) {
    this.reviews = reviews;
  }

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

  productToToaster(data: {status: boolean, message: string, product?: Product}){
    if(data.status){
      this.product = data.product!;
    }

    this.toastLoader(data.status, data.message);
  }
}
