import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMission } from 'app/shared/model/mission.model';

@Component({
  selector: 'jhi-mission-detail',
  templateUrl: './mission-detail.component.html'
})
export class MissionDetailComponent implements OnInit {
  mission: IMission;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mission }) => {
      this.mission = mission;
    });
  }

  previousState() {
    window.history.back();
  }
}
