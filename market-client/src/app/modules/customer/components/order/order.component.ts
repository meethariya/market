import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { CustomerService } from '../../services/customer.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { ToasterComponent } from 'src/app/modules/facet/toaster/toaster.component';

/**
 * Order Component. This component shows table of orders made by the customer.
 * Provides options for `sorting`.
 * Shows individual order in **detail**.
 * If the user has not reviewed the product, It gives option to `review` it.
 * Shows Toast message when review is uploaded or even when any error occurs using {@link ToasterComponent}
 * App route link: `/customer/order`
 */
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
  p: number = 1; // Pagination page number
  allOrders: Order[] = []; // List of all orders
  fixedOrder: Order[] = []; // List of fixed orders
  myReviews: Review[] = []; // List of all reviews
  reviewedProductId: number[] = []; // List of products that have been reviewed
  reviewImages: string[] = []; // List of images when review is submitted
  ratingStar: number = 5; // Default Rating Stars

  orderVariable: string = 'id'; // Default order sort
  orderReverse: boolean = true; // Sorting ascending/descending
  sortIcon = faSort; // Sort Icon

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  addReview = new FormGroup({
    productId: new FormControl(''),
    comment: new FormControl('', [Validators.maxLength(65535)]),
    rating: new FormControl(''),
  });

  constructor(private customerService: CustomerService) {}

  /**
   * Fetches all the order by the customer.
   * Uses {@link CustomerService.getOrder()}.
   * Loads all the reviews given by the customer using {@link reviewLoader()}.
   * Toasts error message on failure.
   *
   * @returns `void`
   */
  ngOnInit(): void {
    this.customerService.getOrder().subscribe({
      next: (data) => {
        this.allOrders = data;
        this.fixedOrder = data;
      },
      error: (err) => this.toastLoader(false, err.error),
    });
    this.reviewLoader();
  }

  /**
   * This method is called when new review is being submitted.
   * Validates all the form fields and submits using {@link CustomerService.postReview()}.
   * Uploads `comments` only if it is filled.
   * Uploads `images` only if it is filled.
   * Toasts status and message on success/failure.
   * **Reloads** all the reviews when successfully uploaded.
   *
   *
   * @returns `void`
   */
  submitReview(): void {
    if (
      this.addReview.value.rating != null &&
      this.addReview.value.comment != null &&
      this.addReview.value.productId != null
    ) {
      let formData = new FormData();
      formData.set('productId', this.addReview.value.productId);
      formData.set('rating', this.addReview.value.rating);
      // add comment only if it exists.
      if (this.addReview.value.comment.length > 0)
        formData.set('comment', this.addReview.value.comment);

      // add images only if it exists.
      for (const element of this.reviewImages) {
        formData.append('images', element);
      }

      this.customerService.postReview(formData).subscribe({
        // on success
        next: (data) => {
          document.getElementById('reviewCloseButton')?.click();
          this.toastLoader(true, 'Review added successfully');
          this.reviewLoader();
        },
        // on error
        error: (err) => {
          this.toastLoader(false, err.error);
        },
      });
    }
  }

  /**
   * Change star rating when the rating `range bar` is modified.
   * @param event
   * @returns `void`
   */
  changeRating(event: any): void {
    this.addReview.patchValue({ rating: event.target.value });
    this.ratingStar = Number(event.target.value);
  }

  /**
   * This method is called when new images is uploaded.
   * It updates {@link reviewImages}.
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
   * Closes the Detail Order modal and opens add review modal.
   * Sets all form fields.
   * @param product
   * @param orderId
   * @returns `void`
   */
  editModal(product: Product, orderId: number): void {
    document.getElementById('addReviewModalLabel')!.innerText = product.name;
    (document.getElementById('reviewRating') as HTMLInputElement).value =
      Number(5).toString();
    this.addReview.patchValue({ rating: Number(5).toString() });
    this.addReview.patchValue({ productId: product.id.toString() });
    this.closeMoreModal(orderId);
  }

  /**
   * Loads all the reviews by the customer.
   * Fills the {@link reviewedProductId} with id's of the products that have been reviewed.
   * Shows `review` button for all products that have been orders but not yet reviewed.
   * Uses {@link CustomerService.getMyReviews()}.
   * Shows toasts on any error.
   * @retutns `void`
   */
  reviewLoader(): void {
    this.customerService.getMyReviews().subscribe({
      // on success
      next: (data) => {
        this.myReviews = data;
        this.reviewedProductId = data.map((p) => p.product.id);
      },
      // on failure
      error: (err) => this.toastLoader(false, err.error),
    });
  }

  /**
   * Closes modal for detail order.
   * @param id
   * @returns `void`
   */
  closeMoreModal(id: number): void {
    document.getElementById('moreCloseModal' + id)?.click();
  }

  /**
   * Sorts table by the clicked attribute.
   * Alters the ascending/descending order.
   * @param value
   * @returns `void`
   */
  sortBy(value: string) {
    this.orderVariable = value;
    this.orderReverse = !this.orderReverse;
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status: boolean, message: string) {
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
   * This methid is called by the Order Filter emitter.
   * It Filters out orders by year.
   * @param modifiedOrderList
   */
  orderFilter(modifiedOrderList: Order[]) {
    this.allOrders = modifiedOrderList;
  }
}
