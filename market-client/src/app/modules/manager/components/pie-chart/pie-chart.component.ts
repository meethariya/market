import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ChartConfiguration, ChartData } from 'chart.js';

/**
 * Pie Chart for payment methods and how many times it has been used.  
 * Fetches 2 main data method and count from backend.
 */
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styles: [],
})
export class PieChartComponent implements OnInit {
  @Output() errorEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  // general configuration
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  // data to be filled from backend
  public pieChartData!: ChartData<'pie', number[], string>;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getPaymentMethodCount().subscribe({
      next: (data) => {
        let label: string[] = [];
        let value: number[] = [];
        
        // iterating through each method fetched
        data.forEach((i) => {
          label.push(i.method);
          value.push(i.count);
        });

        this.pieChartData = { labels: label, datasets: [{ data: value }] };
      },
      error: (err) =>
        this.errorEmitter.emit({ status: false, message: err.error }),
    });
  }
}
