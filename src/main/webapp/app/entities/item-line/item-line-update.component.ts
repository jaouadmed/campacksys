import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IItemLine, ItemLine } from 'app/shared/model/item-line.model';
import { ItemLineService } from './item-line.service';
import { IOrder } from 'app/shared/model/order.model';
import { OrderService } from 'app/entities/order';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';

@Component({
  selector: 'jhi-item-line-update',
  templateUrl: './item-line-update.component.html'
})
export class ItemLineUpdateComponent implements OnInit {
  isSaving: boolean;

  orders: IOrder[];

  products: IProduct[];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    total: [null, [Validators.required]],
    order: [],
    product: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemLineService: ItemLineService,
    protected orderService: OrderService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemLine }) => {
      this.updateForm(itemLine);
    });
    this.orderService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOrder[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOrder[]>) => response.body)
      )
      .subscribe((res: IOrder[]) => (this.orders = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.productService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe((res: IProduct[]) => (this.products = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemLine: IItemLine) {
    this.editForm.patchValue({
      id: itemLine.id,
      quantity: itemLine.quantity,
      total: itemLine.total,
      order: itemLine.order,
      product: itemLine.product
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemLine = this.createFromForm();
    if (itemLine.id !== undefined) {
      this.subscribeToSaveResponse(this.itemLineService.update(itemLine));
    } else {
      this.subscribeToSaveResponse(this.itemLineService.create(itemLine));
    }
  }

  private createFromForm(): IItemLine {
    return {
      ...new ItemLine(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      total: this.editForm.get(['total']).value,
      order: this.editForm.get(['order']).value,
      product: this.editForm.get(['product']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemLine>>) {
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

  trackOrderById(index: number, item: IOrder) {
    return item.id;
  }

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }
}
