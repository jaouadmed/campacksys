import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IItemLine } from 'app/shared/model/item-line.model';

@Component({
  selector: 'jhi-item-line-detail',
  templateUrl: './item-line-detail.component.html'
})
export class ItemLineDetailComponent implements OnInit {
  itemLine: IItemLine;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemLine }) => {
      this.itemLine = itemLine;
    });
  }

  previousState() {
    window.history.back();
  }
}
