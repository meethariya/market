import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

/**
 * Bar Chart for products sold grouped by category.  
 * Fetches 2 main data category and count from backend.
 */
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styles: [],
})
export class BarChartComponent implements OnInit {
  @Output() errorEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  // general configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales:{
      y:{
        title: {
          display: true,
          text:"Count"
        } 
      },
      x:{
        title: {
          display: true,
          text:"Category"
        } 
      }
      
    }
  };

  // data to be filled from backend
  public barChartData!: ChartData<'bar'>;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getSalesByCategory().subscribe({
      next: (data) => {
        let map = new Map(Object.entries(data));
        let label: string[] = [];
        let value: number[] = [];
        // iterating through each method fetched
        for (let i of map.entries()) {
          label.push(i[0]);
          value.push(i[1]);
        }
        this.barChartData = {
          labels: label,
          datasets: [
            { data: value, label: 'Products', backgroundColor: '#FFB400' },
          ],
          yLabels:["Count"]
        };
      },
      error: (err) =>
        this.errorEmitter.emit({ status: false, message: err.error }),
    });
  }
}
