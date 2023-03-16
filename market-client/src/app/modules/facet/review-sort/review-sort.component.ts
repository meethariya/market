import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-sort',
  template: `
    <!--Sort by-->
    <div class="my-2">
      <select
        class="form-select"
        aria-label="Sort By"
        (change)="onSortByChange($event)"
      >
        <option selected disabled>Sort By</option>
        <option value="1">Rating: High-Low</option>
        <option value="2">Rating: Low-High</option>
        <option value="3">Review Date: latest</option>
        <option value="4">Review Date: oldest</option>
        <option value="5">Review</option>
        <option value="6">Images</option>
      </select>
    </div>
  `,
  styles: [],
})
export class ReviewSortComponent {
  @Input() reviews!: Review[];
  @Output() reviewSortEmitter: EventEmitter<Review[]> = new EventEmitter();

  onSortByChange($event: Event) {
    const userValue = ($event.target as HTMLInputElement).value;
    switch (userValue) {
      case '1':
        this.reviews.sort((a, b) => b.rating - a.rating);
        break;
      case '2':
        this.reviews.sort((a, b) => a.rating - b.rating);
        break;
      case '3':
        this.reviews.sort((a, b) => (a.modifiedOn > b.modifiedOn ? -1 : 1));
        break;
      case '4':
        this.reviews.sort((a, b) => (a.modifiedOn > b.modifiedOn ? 1 : -1));
        break;
      case '5':
        this.reviews.sort((a, b) => {
          let aLength = 0;
          let bLength = 0;
          if (a.comment != null) aLength = a.comment.length;
          if (b.comment != null) bLength = b.comment.length;
          return bLength - aLength;
        });
        break;
      case '6':
        this.reviews.sort((a, b) => b.imagePath.length - a.imagePath.length);
        break;
      default:
        break;
    }

    this.reviewSortEmitter.emit(this.reviews);
  }
}
