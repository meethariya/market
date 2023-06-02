import { Component, Input } from '@angular/core';

/**
 * This components takes input for icon, its background color, title text and number value.
 * Used to display statistics.
 */
@Component({
  selector: 'app-small-data',
  templateUrl: './small-data.component.html',
  styles: [
    `
    .purple{
      background-color:#9155FD;
    }

    .green{
      background-color:#56CA00;
    }

    .yellow{
      background-color:#FFB400;
    }

    .sky-blue{
      background-color:#16B1FF;
    }
    `
  ]
})
export class SmallDataComponent {
  @Input() icon!:any;
  @Input() text!:string;
  @Input() value!:number;
  @Input() color!:string;
}
