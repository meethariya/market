import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { CustomerService } from '../../services/customer.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class OrderComponent implements OnInit {
  p: number = 1;
  allOrders: Order[] = [];
  myReviews: Review[] = [];
  reviewedProductId: number[] = [];
  reviewImages: string[] = [];
  successReviewAdded = false;
  failReviewAdded = false;
  ratingStar:number = 5;

  orderVariable: string = "id";
  orderReverse:boolean = true;
  sortIcon = faSort;

  addReview = new FormGroup({
    productId: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(65535)]),
    rating: new FormControl(''),
  });

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getOrder().subscribe({
      next: (data) => (this.allOrders = data),
      error: (err) => console.log(err),
    });
    this.reviewLoader();
  }

  submitReview() {
    if (
      this.addReview.value.rating != null &&
      this.addReview.value.comment != null &&
      this.addReview.value.productId != null
    ) {
      let formData = new FormData();
      formData.set('productId', this.addReview.value.productId);
      formData.set('rating', this.addReview.value.rating);
      if (this.addReview.value.comment.length > 0)
        formData.set('comment', this.addReview.value.comment);

      for (const element of this.reviewImages) {
        formData.append('images', element);
      }

      this.customerService.postReview(formData).subscribe({
        next: (data) => {
          document.getElementById('reviewCloseButton')?.click();
          this.successReviewAdded = true;
          this.reviewLoader();
        },
        error: (err) => {
          this.failReviewAdded = true;
        },
      });
    }
  }

  changeRating(event: any) {
    this.addReview.patchValue({ rating: event.target.value });
    this.ratingStar = Number(event.target.value);
  }

  onImageChange(event: any) {
    this.reviewImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.reviewImages.push(event.target.files[i]);
    }
  }

  editModal(product: Product, orderId:number) {
    document.getElementById('addReviewModalLabel')!.innerText = product.name;
    (document.getElementById('reviewRating') as HTMLInputElement).value =
      Number(5).toString();
    this.addReview.patchValue({ rating: Number(5).toString() });
    this.addReview.patchValue({ productId: product.id.toString() });
    this.closeMoreModal(orderId);
  }

  reviewLoader(){
    this.customerService.getMyReviews().subscribe({
      next: (data) => {
        this.myReviews = data;
        this.reviewedProductId = data.map((p) => p.product.id);
      },
      error: (err) => console.log(err),
    });
  }

  closeMoreModal(id:number){
    document.getElementById("moreCloseModal"+id)?.click();
  }

  sortBy(value:string){
    this.orderVariable = value;
    this.orderReverse = !this.orderReverse;
  }
}
