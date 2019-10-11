import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStock, Stock } from 'app/shared/model/stock.model';
import { StockService } from './stock.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { IUnit } from 'app/shared/model/unit.model';
import { UnitService } from 'app/entities/unit';

@Component({
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html'
})
export class StockUpdateComponent implements OnInit {
  isSaving: boolean;

  products: IProduct[];

  units: IUnit[];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    alertLimit: [null, [Validators.required, Validators.min(0)]],
    product: [],
    unit: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected stockService: StockService,
    protected productService: ProductService,
    protected unitService: UnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.updateForm(stock);
    });
    this.productService
      .query({ filter: 'stock-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IProduct[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProduct[]>) => response.body)
      )
      .subscribe(
        (res: IProduct[]) => {
          if (!this.editForm.get('product').value || !this.editForm.get('product').value.id) {
            this.products = res;
          } else {
            this.productService
              .find(this.editForm.get('product').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IProduct>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IProduct>) => subResponse.body)
              )
              .subscribe(
                (subRes: IProduct) => (this.products = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.unitService
      .query({ filter: 'stock-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IUnit[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUnit[]>) => response.body)
      )
      .subscribe(
        (res: IUnit[]) => {
          if (!this.editForm.get('unit').value || !this.editForm.get('unit').value.id) {
            this.units = res;
          } else {
            this.unitService
              .find(this.editForm.get('unit').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IUnit>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IUnit>) => subResponse.body)
              )
              .subscribe(
                (subRes: IUnit) => (this.units = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(stock: IStock) {
    this.editForm.patchValue({
      id: stock.id,
      quantity: stock.quantity,
      alertLimit: stock.alertLimit,
      product: stock.product,
      unit: stock.unit
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const stock = this.createFromForm();
    if (stock.id !== undefined) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  private createFromForm(): IStock {
    return {
      ...new Stock(),
      id: this.editForm.get(['id']).value,
      quantity: this.editForm.get(['quantity']).value,
      alertLimit: this.editForm.get(['alertLimit']).value,
      product: this.editForm.get(['product']).value,
      unit: this.editForm.get(['unit']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>) {
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

  trackProductById(index: number, item: IProduct) {
    return item.id;
  }

  trackUnitById(index: number, item: IUnit) {
    return item.id;
  }
}
