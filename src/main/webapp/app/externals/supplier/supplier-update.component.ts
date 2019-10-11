import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISupplier, Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'jhi-supplier-update',
  templateUrl: './supplier-update.component.html'
})
export class SupplierUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(100)]],
    address: [null, [Validators.maxLength(250)]],
    email: [null, [Validators.pattern('.+@.+..+')]],
    phoneNumber: [null, [Validators.required, Validators.pattern('[0-9]{10}')]]
  });

  constructor(protected supplierService: SupplierService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supplier }) => {
      this.updateForm(supplier);
    });
  }

  updateForm(supplier: ISupplier) {
    this.editForm.patchValue({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      email: supplier.email,
      phoneNumber: supplier.phoneNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const supplier = this.createFromForm();
    if (supplier.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierService.update(supplier));
    } else {
      this.subscribeToSaveResponse(this.supplierService.create(supplier));
    }
  }

  private createFromForm(): ISupplier {
    return {
      ...new Supplier(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      address: this.editForm.get(['address']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
