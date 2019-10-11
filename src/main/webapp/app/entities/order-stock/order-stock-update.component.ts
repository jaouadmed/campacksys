import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOrderStock, OrderStock } from 'app/shared/model/order-stock.model';
import { OrderStockService } from './order-stock.service';
import { IAlert } from 'app/shared/model/alert.model';
import { AlertService } from 'app/entities/alert';
import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from 'app/entities/supplier';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
  selector: 'jhi-order-stock-update',
  templateUrl: './order-stock-update.component.html'
})
export class OrderStockUpdateComponent implements OnInit {
  isSaving: boolean;

  alerts: IAlert[];

  suppliers: ISupplier[];

  employees: IEmployee[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    quantity: [null, [Validators.required, Validators.min(1)]],
    state: [null, [Validators.required]],
    alert: [],
    supplier: [],
    employee: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderStockService: OrderStockService,
    protected alertService: AlertService,
    protected supplierService: SupplierService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ orderStock }) => {
      this.updateForm(orderStock);
    });
    this.alertService
      .query({ filter: 'orderstock-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IAlert[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlert[]>) => response.body)
      )
      .subscribe(
        (res: IAlert[]) => {
          if (!this.editForm.get('alert').value || !this.editForm.get('alert').value.id) {
            this.alerts = res;
          } else {
            this.alertService
              .find(this.editForm.get('alert').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IAlert>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IAlert>) => subResponse.body)
              )
              .subscribe(
                (subRes: IAlert) => (this.alerts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.supplierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISupplier[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISupplier[]>) => response.body)
      )
      .subscribe((res: ISupplier[]) => (this.suppliers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(orderStock: IOrderStock) {
    this.editForm.patchValue({
      id: orderStock.id,
      date: orderStock.date,
      quantity: orderStock.quantity,
      state: orderStock.state,
      alert: orderStock.alert,
      supplier: orderStock.supplier,
      employee: orderStock.employee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const orderStock = this.createFromForm();
    if (orderStock.id !== undefined) {
      this.subscribeToSaveResponse(this.orderStockService.update(orderStock));
    } else {
      this.subscribeToSaveResponse(this.orderStockService.create(orderStock));
    }
  }

  private createFromForm(): IOrderStock {
    return {
      ...new OrderStock(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      quantity: this.editForm.get(['quantity']).value,
      state: this.editForm.get(['state']).value,
      alert: this.editForm.get(['alert']).value,
      supplier: this.editForm.get(['supplier']).value,
      employee: this.editForm.get(['employee']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderStock>>) {
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

  trackAlertById(index: number, item: IAlert) {
    return item.id;
  }

  trackSupplierById(index: number, item: ISupplier) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
