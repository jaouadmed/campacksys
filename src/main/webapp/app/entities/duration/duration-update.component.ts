import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IDuration, Duration } from 'app/shared/model/duration.model';
import { DurationService } from './duration.service';
import { IMission } from 'app/shared/model/mission.model';
import { MissionService } from 'app/entities/mission';

@Component({
  selector: 'jhi-duration-update',
  templateUrl: './duration-update.component.html'
})
export class DurationUpdateComponent implements OnInit {
  isSaving: boolean;

  missions: IMission[];
  dateFromDp: any;
  dateToDp: any;

  editForm = this.fb.group({
    id: [],
    dateFrom: [null, [Validators.required]],
    dateTo: [null, [Validators.required]],
    mission: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected durationService: DurationService,
    protected missionService: MissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ duration }) => {
      this.updateForm(duration);
    });
    this.missionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMission[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMission[]>) => response.body)
      )
      .subscribe((res: IMission[]) => (this.missions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(duration: IDuration) {
    this.editForm.patchValue({
      id: duration.id,
      dateFrom: duration.dateFrom,
      dateTo: duration.dateTo,
      mission: duration.mission
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const duration = this.createFromForm();
    if (duration.id !== undefined) {
      this.subscribeToSaveResponse(this.durationService.update(duration));
    } else {
      this.subscribeToSaveResponse(this.durationService.create(duration));
    }
  }

  private createFromForm(): IDuration {
    return {
      ...new Duration(),
      id: this.editForm.get(['id']).value,
      dateFrom: this.editForm.get(['dateFrom']).value,
      dateTo: this.editForm.get(['dateTo']).value,
      mission: this.editForm.get(['mission']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDuration>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMissionById(index: number, item: IMission) {
    return item.id;
  }
}
