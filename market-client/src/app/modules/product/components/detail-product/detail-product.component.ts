import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductService } from '../../services/product.service';

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
  editSuccess: boolean = false;
  editFail: boolean = false;
  editFailMessage: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductDetails(this.id).subscribe({
      next: (value) => (this.product = value),
      error: (err) => console.log(err),
    });
    this.productService.getProductReviews(this.id).subscribe({
      next: (data) => {
        this.reviews = data;
        data.forEach((r) => (this.starCountArray[r.rating - 1] += 1));
      },
      error: (err) => console.log(err),
    });
    this.activeRole = this.productService.getActiveRole();
  }

  sortReviews(reviews: Review[]) {
    this.reviews = reviews;
  }

  editStatus(status: boolean) {
    if (status) {
      this.editSuccess = true;
    } else {
      this.editFail = true;
    }
  }
  modifyErrorMessage(message: string) {
    this.editFailMessage = message;
  }
  modifiedProduct(product: Product) {
    this.product = product;
  }
}
