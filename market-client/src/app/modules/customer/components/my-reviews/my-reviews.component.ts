import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review';
import { CustomerService } from '../../services/customer.service';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';
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
  p: number = 1;
  reviews: Review[] = [];
  reviewImages: string[] = [];

  editReview = new FormGroup({
    productId: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(65535)]),
    rating: new FormControl(''),
  });
  fullStar = fullStar;
  emptyStar = emptyStar;
  halfStar = halfStar;
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

      for (let i = 0; i < this.reviewImages.length; i++) {
        formData.append('images', this.reviewImages[i]);
      }

      this.customerService.postReview(formData).subscribe({
        next: (data) => {
          document.getElementById('reviewCloseButton')?.click();
          this.loadReviews();
          alert('Review Modified');
        },
        error(err) {
          console.log(err);
          alert(err.error);
        },
      });
    }
  }

  changeRating(event: any) {
    this.editReview.patchValue({ rating: event.target.value });
  }

  loadReviews() {
    this.customerService.getMyReviews().subscribe({
      next: (data) => (this.reviews = data),
      error: (err) => console.log(err),
    });
  }

  deleteReview(reviewId: number) {
    this.customerService.deleteReview(reviewId).subscribe({
      next: (data) => {
        this.loadReviews();
        alert('Review Deleted');
      },
      error: (err) => alert('Failed! ' + err.error),
    });
  }

  sortReviews(reviews: Review[]) {
    this.reviews = reviews;
  }
}
