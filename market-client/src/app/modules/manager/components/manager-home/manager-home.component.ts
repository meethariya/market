import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/models/inventory';
import { Product } from 'src/app/models/product';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styles: [],
})
export class ManagerHomeComponent implements OnInit {
  inventory: Inventory[] = [];

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.managerService.getProducts().subscribe({
      next: (products) => {
        this.managerService.getInventory().subscribe({
          next: (data) => {
            products.forEach((i) => {
              if (!data.map((i) => i.product.id).includes(i.id)) {
                let temp: Inventory = new Inventory(i, 0, undefined, undefined);
                data.push(temp);
              }
            });
            this.inventory = data;
          },
          error: (err) => console.log(err),
        });
      },
      error: (err) => console.log(err),
    });
  }
}
