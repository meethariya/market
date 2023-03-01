import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styles: [
  ]
})
export class ManagerHomeComponent implements OnInit {

  inventory:Inventory[] = [];

  constructor(private managerService: ManagerService){}

  ngOnInit(): void {
    this.managerService.getInventory().subscribe({
      next: (data) => this.inventory = data,
      error: (err) => console.log(err)
    });
  }

}
