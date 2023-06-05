import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { ChartConfiguration } from 'chart.js';

/**
 * Line Chart Graph to display sales for present year/month segregated by gender.
 * Graph's data can be altered between year and month by dropdown.
 */
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styles: [``],
})
export class LineChartComponent implements OnInit {
  // error emitter
  @Output() errorEmitter: EventEmitter<{
    status: boolean;
    message: string;
  }> = new EventEmitter();

  // Changes graph based on select statement.
  mode = 'Year';

  // year chart configuration
  yearLineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };
  yearLineChartData!: ChartConfiguration['data'];
  // year data configuration
  yearLabel = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  yearDataset: ChartConfiguration['data'] = {
    datasets: [],
    labels: this.yearLabel,
  };

  // month chart configuration
  monthLineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };
  monthLineChartData!: ChartConfiguration['data'];
  // month data configuration
  monthLabel: number[] = [];
  monthDataset: ChartConfiguration['data'] = {
    datasets: [],
    labels: this.monthLabel,
  };

  constructor(private managerService: ManagerService) {
    // max date of current month
    var today = new Date();
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // filling label for month (X axis)
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) this.monthLabel.push(i);
  }

  ngOnInit(): void {
    // this year male sales
    this.yearDatasetFiller(true);
    // this year female sales
    this.yearDatasetFiller(false);
    // set Year data
    this.yearLineChartData = this.yearDataset;

    // this month male sales
    this.monthDatasetFiller(true);
    // this month female sales
    this.monthDatasetFiller(false);
    // set Month data
    this.monthLineChartData = this.monthDataset;
  }

  /**
   * Fetches male/female order details for current year and fills {@link yearDataset}.  
   * Different color of chart for male/female.
   * @param gender (boolean) true=male/false=female
   */
  yearDatasetFiller(gender: boolean): void {
    this.managerService.getYearSalesByGender(gender).subscribe({
      next: (data) => {
        let dataIndex = 0;
        let yearData = [];
        // populating year's male data
        for (let i = 0; i < 12; i++) {
          if (dataIndex < data.length && data[dataIndex].group - 1 == i) {
            yearData.push(data[dataIndex++].count);
          } else {
            yearData.push(0);
          }
        }
        // adding dataset
        if (gender) {
          this.yearDataset.datasets.push({
            data: yearData,
            label: 'Male',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          });
        } else {
          this.yearDataset.datasets.push({
            data: yearData,
            label: 'Female',
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,1)',
            fill: 'origin',
          });
        }
      },
      error: (err) =>
        this.errorEmitter.emit({ status: false, message: err.error }),
    });
  }

  /**
   * Fetches male/female order details for current month and fills {@link monthDataset}.  
   * Different color of chart for male/female.
   * @param gender (boolean) true=male/false=female
   */
  monthDatasetFiller(gender: boolean): void {
    this.managerService.getMonthSalesByGender(gender).subscribe({
      next: (data) => {
        let dataIndex = 0;
        let monthData = [];
        // populating month's female data
        for (let i = 0; i < this.monthLabel.length; i++) {
          if (dataIndex < data.length && data[dataIndex].group - 1 == i) {
            monthData.push(data[dataIndex++].count);
          } else {
            monthData.push(0);
          }
        }
        //adding dataset
        if (gender) {
          this.monthDataset.datasets.push({
            data: monthData,
            label: 'Male',
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          });
        } else {
          this.monthDataset.datasets.push({
            data: monthData,
            label: 'Female',
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,1)',
            fill: 'origin',
          });
        }
      },
      error: (err) =>
        this.errorEmitter.emit({ status: false, message: err.error }),
    });
  }
}
