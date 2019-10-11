import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlert } from 'app/shared/model/alert.model';

@Component({
  selector: 'jhi-alert-detail',
  templateUrl: './alert-detail.component.html'
})
export class AlertDetailComponent implements OnInit {
  alert: IAlert;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alert }) => {
      this.alert = alert;
    });
  }

  previousState() {
    window.history.back();
  }
}
