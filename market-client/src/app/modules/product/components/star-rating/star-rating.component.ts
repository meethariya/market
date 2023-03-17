import { Component, Input } from '@angular/core';
import { faStar as fullStar, faStarHalfStroke as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styles: [
  ]
})
export class StarRatingComponent {
  @Input() rating!:number;
  fullStar = fullStar;
  emptyStar = emptyStar;
  halfStar = halfStar;

  floatToInt(rating:number):number{
    return Math.floor(rating);
  }
}
