import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .carousel .carousel-item {
        height: 500px;
      }

      .carousel-item img {
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        min-height: 500px;
      }
    `,
  ],
})
export class HomeComponent {}
