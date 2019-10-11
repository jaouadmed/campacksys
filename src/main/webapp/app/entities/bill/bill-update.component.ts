import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IBill, Bill } from 'app/shared/model/bill.model';
import { BillService } from './bill.service';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment';

@Component({
  selector: 'jhi-bill-update',
  templateUrl: './bill-update.component.html'
})
export class BillUpdateComponent implements OnInit {
  isSaving: boolean;

  payments: IPayment[];
  dueDateDp: any;

  editForm = this.fb.group({
    id: [],
    dueDate: [null, [Validators.required]],
    dueAmount: [null, [Validators.required, Validators.min(0)]],
    state: [null, [Validators.required]],
    payment: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected billService: BillService,
    protected paymentService: PaymentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bill }) => {
      this.updateForm(bill);
    });
    this.paymentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPayment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPayment[]>) => response.body)
      )
      .subscribe((res: IPayment[]) => (this.payments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(bill: IBill) {
    this.editForm.patchValue({
      id: bill.id,
      dueDate: bill.dueDate,
      dueAmount: bill.dueAmount,
      state: bill.state,
      payment: bill.payment
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bill = this.createFromForm();
    if (bill.id !== undefined) {
      this.subscribeToSaveResponse(this.billService.update(bill));
    } else {
      this.subscribeToSaveResponse(this.billService.create(bill));
    }
  }

  private createFromForm(): IBill {
    return {
      ...new Bill(),
      id: this.editForm.get(['id']).value,
      dueDate: this.editForm.get(['dueDate']).value,
      dueAmount: this.editForm.get(['dueAmount']).value,
      state: this.editForm.get(['state']).value,
      payment: this.editForm.get(['payment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBill>>) {
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

  trackPaymentById(index: number, item: IPayment) {
    return item.id;
  }
}
