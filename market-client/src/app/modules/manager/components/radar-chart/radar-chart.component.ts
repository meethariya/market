import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ManagerService } from '../../services/manager.service';

/**
 * Radar Chart for number of products for each rating star.  
 * Ratings are rounded up to whole numbers.
 */
@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styles: [],
})
export class RadarChartComponent implements OnInit {
  @Output() errorEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  productCount!: number[];
  
  // general configuration
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  // data to be filled from backend
  public radarChartData!: ChartData<'radar'>;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getProductCountByRating().subscribe({
      next: (data) => {
        this.productCount = [0, 0, 0, 0, 0, 0];
        // iterating through each rating fetched
        data.forEach((i) => {
          this.productCount[i.roundedRating] = i.idCount;
        });

        this.radarChartData = {
          labels: ['0', '1', '2', '3', '4', '5'],
          datasets: [
            {
              data: this.productCount,
              label: 'Rating in Stars',
            },
          ],
        };

      },
      error: (err) =>
        this.errorEmitter.emit({status: false,message: err.error}),
    });
  }


  
}
