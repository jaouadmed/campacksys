import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jhi-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['stock.component.scss']
})
export class StockComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'product', icon: 'fa fa-fw fa-user-circle-o', routerLink: ['product'] },
      { label: 'category', icon: 'fa fa-fw fa-truck', routerLink: ['category'] }
    ];
  }
}
