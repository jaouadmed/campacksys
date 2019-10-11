import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOrder, Order } from 'app/shared/model/order.model';
import { OrderService } from './order.service';
import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from 'app/entities/discount';
import { IPayment } from 'app/shared/model/payment.model';
import { PaymentService } from 'app/entities/payment';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
  selector: 'jhi-order-update',
  templateUrl: './order-update.component.html'
})
export class OrderUpdateComponent implements OnInit {
  isSaving: boolean;

  discounts: IDiscount[];

  payments: IPayment[];

  clients: IClient[];

  employees: IEmployee[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    total: [null, [Validators.required]],
    state: [null, [Validators.required]],
    discount: [],
    payment: [],
    client: [null, Validators.required],
    employee: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected orderService: OrderService,
    protected discountService: DiscountService,
    protected paymentService: PaymentService,
    protected clientService: ClientService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);
    });
    this.discountService
      .query({ filter: 'order-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDiscount[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDiscount[]>) => response.body)
      )
      .subscribe(
        (res: IDiscount[]) => {
          if (!this.editForm.get('discount').value || !this.editForm.get('discount').value.id) {
            this.discounts = res;
          } else {
            this.discountService
              .find(this.editForm.get('discount').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDiscount>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDiscount>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDiscount) => (this.discounts = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.paymentService
      .query({ filter: 'order-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPayment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPayment[]>) => response.body)
      )
      .subscribe(
        (res: IPayment[]) => {
          if (!this.editForm.get('payment').value || !this.editForm.get('payment').value.id) {
            this.payments = res;
          } else {
            this.paymentService
              .find(this.editForm.get('payment').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPayment>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPayment>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPayment) => (this.payments = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.clientService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClient[]>) => response.body)
      )
      .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(order: IOrder) {
    this.editForm.patchValue({
      id: order.id,
      date: order.date,
      total: order.total,
      state: order.state,
      discount: order.discount,
      payment: order.payment,
      client: order.client,
      employee: order.employee
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  private createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      total: this.editForm.get(['total']).value,
      state: this.editForm.get(['state']).value,
      discount: this.editForm.get(['discount']).value,
      payment: this.editForm.get(['payment']).value,
      client: this.editForm.get(['client']).value,
      employee: this.editForm.get(['employee']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>) {
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

  trackDiscountById(index: number, item: IDiscount) {
    return item.id;
  }

  trackPaymentById(index: number, item: IPayment) {
    return item.id;
  }

  trackClientById(index: number, item: IClient) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
