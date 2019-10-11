import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IAlert, Alert } from 'app/shared/model/alert.model';
import { AlertService } from './alert.service';
import { IStock } from 'app/shared/model/stock.model';
import { StockService } from 'app/entities/stock';

@Component({
  selector: 'jhi-alert-update',
  templateUrl: './alert-update.component.html'
})
export class AlertUpdateComponent implements OnInit {
  isSaving: boolean;

  stocks: IStock[];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    state: [null, [Validators.required]],
    stock: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected alertService: AlertService,
    protected stockService: StockService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ alert }) => {
      this.updateForm(alert);
    });
    this.stockService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStock[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStock[]>) => response.body)
      )
      .subscribe((res: IStock[]) => (this.stocks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(alert: IAlert) {
    this.editForm.patchValue({
      id: alert.id,
      date: alert.date != null ? alert.date.format(DATE_TIME_FORMAT) : null,
      state: alert.state,
      stock: alert.stock
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const alert = this.createFromForm();
    if (alert.id !== undefined) {
      this.subscribeToSaveResponse(this.alertService.update(alert));
    } else {
      this.subscribeToSaveResponse(this.alertService.create(alert));
    }
  }

  private createFromForm(): IAlert {
    return {
      ...new Alert(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      state: this.editForm.get(['state']).value,
      stock: this.editForm.get(['stock']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlert>>) {
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

  trackStockById(index: number, item: IStock) {
    return item.id;
  }
}
