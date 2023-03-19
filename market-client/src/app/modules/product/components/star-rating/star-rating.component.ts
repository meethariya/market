import { Component, Input } from '@angular/core';
import { faStar as fullStar, faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

/**
 * Star Rating Component.
 * This component takes input as float number rating.  
 * It converts the number as combination of {@link fullStar}, {@link halfStar} , and {@link emptyStar}
 * to make it as 5 stars.
 */
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styles: [
  ]
})
export class StarRatingComponent {
  @Input() rating!:number;        // input from parent
  fullStar = fullStar;            // Full star Icon
  emptyStar = emptyStar;          // Empty star Icon
  halfStar = halfStar;            // Half star Icon

  /**
   * Converts float value of avg rating to whole floor number.
   * @param rating 
   * @returns floor value of avg rating.
   */
  floatToInt(rating:number):number{
    return Math.floor(rating);
  }
}
