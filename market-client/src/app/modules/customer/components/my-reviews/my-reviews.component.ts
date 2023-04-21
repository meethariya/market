import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from 'src/app/models/review';
import { CustomerService } from '../../services/customer.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { ReviewSortComponent } from 'src/app/modules/facet/review-sort/review-sort.component';
import { environment } from 'src/environments/environment';

/**
 * MyReviews Component. This component shows all the reviews given by the customer on profile page.  
 * It fetches all reviews from {@link CustomerService.getMyReviews()} and shows them on profile page.  
 * Customer can **delete** or **modify** the review.  
 * @see {@link ProfileComponent}
 */
@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styles: [
    `
    /* pagination CSS */
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
  }> = new EventEmitter();          // Emits status and message when review is modified or deleted.

  p: number = 1;                    // pagination page number
  reviews: Review[] = [];           // List of reviews
  reviewImages: string[] = [];      // List of images uploaded when review is modified
  ratingStar: number = 5;           // Default rating to modify rating. Used for {@link StarRatingComponent}
  seperator = environment.seperator;      // seperator based on OS

  editReview = new FormGroup({
    productId: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(65535)]),
    rating: new FormControl(''),
  });
  trash = faTrash;                  // Trash Icon

  constructor(private customerService: CustomerService) {}

  /**
   * Loads all reviews.
   * @returns `void`
   */
  ngOnInit(): void {
    this.loadReviews();
  }

  /**
   * Accepts a review and sets all form fields as its values to modify.
   * @param review 
   * @return `void`
   */
  editModal(review: Review): void {
    // set modal title as product name
    document.getElementById('modifyReviewModalLabel')!.innerText =
      review.product.name;
    // set review rating
    (document.getElementById('reviewRating') as HTMLInputElement).value =
      review.rating.toString();
    // Modify StarRatingComponent
    this.ratingStar = review.rating;
    this.editReview.patchValue({ rating: review.rating.toString() });
    // Modify review comment
    if (review.comment != null) {
      (document.getElementById('reviewComment') as HTMLInputElement).value =
        review.comment;
      this.editReview.patchValue({ comment: review.comment });
    }
    this.editReview.patchValue({ productId: review.product.id.toString() });
  }

  /**
   * This method is called everytime image is uploaded.  
   * It modifies the {@link reviewImages}.
   * @param event 
   * @returns `void`
   */
  onImageChange(event: any): void {
    this.reviewImages = [];
    for (let i = 0; i < event.target!.files.length; i++) {
      this.reviewImages.push(event.target.files[i]);
    }
  }

  /**
   * This method is called when modal is submitted i.e. when review is modified.  
   * It validates all the form fields. It add comment field only if it is updated.
   * It adds images only if they are uploaded.  
   * Submits the modified form using {@link CustomerService.postReview()}.  
   * Finally emits status and message using {@link reviewEmitter} to show toast on success/failure.
   * @returns `void`
   */
  modifyReview(): void {
    if (
      this.editReview.value.rating != null &&
      this.editReview.value.comment != null &&
      this.editReview.value.productId != null
    ) {
      let formData = new FormData();
      formData.set('productId', this.editReview.value.productId);
      formData.set('rating', this.editReview.value.rating);

      // add comment field only if it exists.
      if (this.editReview.value.comment.length > 0)
        formData.set('comment', this.editReview.value.comment);

        // add images field only if it exists.
      for (const element of this.reviewImages) {
        formData.append('images', element);
      }

      // submit the form
      this.customerService.postReview(formData).subscribe({
        // on success
        next: (data) => {
          document.getElementById('reviewCloseButton')?.click();
          this.loadReviews();
          this.reviewEmitter.emit({
            status: true,
            message: 'Review has been updated',
          });
        },
        // on failure
        error: (err) =>
          this.reviewEmitter.emit({
            status: false,
            message: err.error,
          }),
      });
    }
  }

  /**
   * Changes rating as the rating `range bar` is modified.  
   * Also modified {@link ratingStar} to change the number of stars.
   * 
   * @param event 
   * @returns `void`
   */
  changeRating(event: any): void {
    this.editReview.patchValue({ rating: event.target.value });
    this.ratingStar = event.target.value;
  }

  /**
   * Loads all the reviews by the customer.  
   * Uses {@link CustomerService.getMyReviews()}.  
   * Emits status and message if any errors are encountered using {@link reviewEmitter}.
   * 
   * 
   * @return `void`
   */
  loadReviews(): void {
    this.customerService.getMyReviews().subscribe({
      next: (data) => (this.reviews = data),
      error: (err) =>
        this.reviewEmitter.emit({ status: false, message: err.error }),
    });
  }

  /**
   * Deletes the review using {@link CustomerService.deleteReview()}.  
   * This method is called when the {@link trash} is clicked.  
   * Emits status and message when the review is deleted success/failure.  
   * 
   * @param reviewId 
   * @return `void`
   */
  deleteReview(reviewId: number): void {
    this.customerService.deleteReview(reviewId).subscribe({
      // on success
      next: (data) => {
        // load all reviews again
        this.loadReviews();
        this.reviewEmitter.emit({
          status: true,
          message: 'Review has been deleted',
        });
      },
      // on failure
      error: (err) => this.reviewEmitter.emit({ status: false, message: err.error }),
    });
  }

  /**
   * Sort all the reviews based on the select method.  
   * Sorting is done by the {@link ReviewSortComponent}.  
   * 
   * @param reviews 
   * @returns `void`
   */
  sortReviews(reviews: Review[]): void {
    this.reviews = reviews;
  }
}
