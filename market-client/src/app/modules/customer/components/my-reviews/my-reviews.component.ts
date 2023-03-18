import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/models/review';
import { CustomerService } from '../../services/customer.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styles: [
    `
      .my-pagination ::ng-deep .ngx-pagination .current {
        background: #64baaa;
        border-radius: 20px;
      }
    `,
  ],
})
export class MyReviewsComponent implements OnInit {
  @Output() reviewEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  p: number = 1;
  reviews: Review[] = [];
  reviewImages: string[] = [];
  ratingStar: number = 5;

  editReview = new FormGroup({
    productId: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(65535)]),
    rating: new FormControl(''),
  });
  trash = faTrash;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  editModal(review: Review) {
    document.getElementById('modifyReviewModalLabel')!.innerText =
      review.product.name;
    (document.getElementById('reviewRating') as HTMLInputElement).value =
      review.rating.toString();
    this.ratingStar = review.rating;
    this.editReview.patchValue({ rating: review.rating.toString() });
    if (review.comment != null) {
      (document.getElementById('reviewComment') as HTMLInputElement).value =
        review.comment;
      this.editReview.patchValue({ comment: review.comment });
    }
    this.editReview.patchValue({ productId: review.product.id.toString() });
  }

  onImageChange(event: any) {
    this.reviewImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.reviewImages.push(event.target.files[i]);
    }
  }

  modifyReview() {
    if (
      this.editReview.value.rating != null &&
      this.editReview.value.comment != null &&
      this.editReview.value.productId != null
    ) {
      let formData = new FormData();
      formData.set('productId', this.editReview.value.productId);
      formData.set('rating', this.editReview.value.rating);
      if (this.editReview.value.comment.length > 0)
        formData.set('comment', this.editReview.value.comment);

      for (const element of this.reviewImages) {
        formData.append('images', element);
      }

      this.customerService.postReview(formData).subscribe({
        next: (data) => {
          document.getElementById('reviewCloseButton')?.click();
          this.loadReviews();
          this.reviewEmitter.emit({
            status: true,
            message: 'Review has been updated',
          });
        },
        error: (err) =>
          this.reviewEmitter.emit({
            status: false,
            message: err.error,
          }),
      });
    }
  }

  changeRating(event: any) {
    this.editReview.patchValue({ rating: event.target.value });
    this.ratingStar = event.target.value;
  }

  loadReviews() {
    this.customerService.getMyReviews().subscribe({
      next: (data) => (this.reviews = data),
      error: (err) =>
        this.reviewEmitter.emit({ status: false, message: err.error }),
    });
  }

  deleteReview(reviewId: number) {
    this.customerService.deleteReview(reviewId).subscribe({
      next: (data) => {
        this.loadReviews();
        this.reviewEmitter.emit({
          status: true,
          message: 'Review has been deleted',
        });
      },
      error: (err) => this.reviewEmitter.emit({ status: false, message: err.error }),
    });
  }

  sortReviews(reviews: Review[]) {
    this.reviews = reviews;
  }
}
