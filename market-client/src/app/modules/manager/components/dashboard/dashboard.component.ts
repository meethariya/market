import { Component, OnInit } from '@angular/core';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { ManagerService } from '../../services/manager.service';
/**
 * Sets Admin dashboard.  
 * Fetches all required data from backend and creates bunch of cards to be displayed.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    
  ]
})
export class DashboardComponent implements OnInit{
  greeting!: string;          // greeting message

  // Toast settings variables
  toastTitle: string = '';
  toastMessage: string = '';
  toastColorClass: string = '';
  toastReady: boolean = false;

  // First Row
  sales=faArrowTrendUp;
  customers=faUsers;
  products=faCubes;
  revenue=faIndianRupeeSign;

  salesValue!:number;
  customersValue!:number;
  productsValue!:number;
  revenueValue!:number;

  // Second Row
  todayIcon=faSun;
  weekIcon=faCalendarWeek;
  monthIcon=faCalendarDays;
  yearIcon=faCalendarCheck;

  todaySale!:number;
  weekSale!:number;
  monthSale!:number;
  yearSale!:number;
  
  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.greeting = this.setGreeting();

    // fetching first row data
    // all Sale
    this.managerService.getAllSalesCount().subscribe({
      next: (data) => this.salesValue=data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // Customer count
    this.managerService.getCustomerCount().subscribe({
      next: (data) => this.customersValue=data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // Product count
    this.managerService.getProductCount().subscribe({
      next: (data) => this.productsValue=data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // Total Revenue
    this.managerService.getTotalRevenue().subscribe({
      next: (data) => this.revenueValue=data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // second row data
    // Today's Sales
    this.managerService.getTodaySale().subscribe({
      next: (data) => this.todaySale = data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // This week's Sales
    this.managerService.getThisWeekSale().subscribe({
      next: (data) => this.weekSale = data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // This month's Sales
    this.managerService.getThisMonthSale().subscribe({
      next: (data) => this.monthSale = data,
      error: (err) => this.toastLoader(false, err.error)
    });
    
    // This year's Sales
    this.managerService.getThisYearSale().subscribe({
      next: (data) => this.yearSale = data,
      error: (err) => this.toastLoader(false, err.error)
    });
  }

  /**
   * Fetches current time and sets a greeting message accordingly.
   * @returns greeting message
   */
  setGreeting() : string {
    let time = new Date().getHours();

    if(time >=5 && time <12)
      return "Good Morning! Let's reach new heights today."
    else if(time>=12 && time < 16)
      return "Seize the afternoon and let your determination fuel your progress."
    else
      return "Good evening! Embrace progress, anticipate success."
  }

  /**
   * Shows the toast using {@link ToasterComponent}.
   * @param status
   * @param message
   * @returns `void`
   */
  toastLoader(status:boolean, message:string): void {
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
   * Emitted status and message from child components shown using toast.
   * @param data 
   * @returns `void`
   */
  toastForwarder(data: {status:boolean, message:string}): void {
    this.toastLoader(data.status, data.message);
  }
}
