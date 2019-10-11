import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDuration } from 'app/shared/model/duration.model';

@Component({
  selector: 'jhi-duration-detail',
  templateUrl: './duration-detail.component.html'
})
export class DurationDetailComponent implements OnInit {
  duration: IDuration;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ duration }) => {
      this.duration = duration;
    });
  }

  previousState() {
    window.history.back();
  }
}
