import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IMission, Mission } from 'app/shared/model/mission.model';
import { MissionService } from './mission.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
  selector: 'jhi-mission-update',
  templateUrl: './mission-update.component.html'
})
export class MissionUpdateComponent implements OnInit {
  isSaving: boolean;

  teams: ITeam[];

  clients: IClient[];
  creationDateDp: any;
  startDateDp: any;

  editForm = this.fb.group({
    id: [],
    creationDate: [null, [Validators.required]],
    nbrDays: [null, [Validators.required]],
    startDate: [],
    state: [null, [Validators.required]],
    team: [null, Validators.required],
    client: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected missionService: MissionService,
    protected teamService: TeamService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mission }) => {
      this.updateForm(mission);
    });
    this.teamService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeam[]>) => response.body)
      )
      .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mission: IMission) {
    this.editForm.patchValue({
      id: mission.id,
      creationDate: mission.creationDate,
      nbrDays: mission.nbrDays,
      startDate: mission.startDate,
      state: mission.state,
      team: mission.team,
      client: mission.client
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mission = this.createFromForm();
    if (mission.id !== undefined) {
      this.subscribeToSaveResponse(this.missionService.update(mission));
    } else {
      this.subscribeToSaveResponse(this.missionService.create(mission));
    }
  }

  private createFromForm(): IMission {
    return {
      ...new Mission(),
      id: this.editForm.get(['id']).value,
      creationDate: this.editForm.get(['creationDate']).value,
      nbrDays: this.editForm.get(['nbrDays']).value,
      startDate: this.editForm.get(['startDate']).value,
      state: this.editForm.get(['state']).value,
      team: this.editForm.get(['team']).value,
      client: this.editForm.get(['client']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMission>>) {
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

  trackTeamById(index: number, item: ITeam) {
    return item.id;
  }

  trackClientById(index: number, item: IClient) {
    return item.id;
  }
}
