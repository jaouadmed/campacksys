import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderStock } from 'app/shared/model/order-stock.model';

@Component({
  selector: 'jhi-order-stock-detail',
  templateUrl: './order-stock-detail.component.html'
})
export class OrderStockDetailComponent implements OnInit {
  orderStock: IOrderStock;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orderStock }) => {
      this.orderStock = orderStock;
    });
  }

  previousState() {
    window.history.back();
  }
}
