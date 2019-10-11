import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IUnit, Unit } from 'app/shared/model/unit.model';
import { UnitService } from './unit.service';

@Component({
  selector: 'jhi-unit-update',
  templateUrl: './unit-update.component.html'
})
export class UnitUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    unit: [null, [Validators.required, Validators.maxLength(100)]],
    description: [null, [Validators.maxLength(250)]]
  });

  constructor(protected unitService: UnitService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ unit }) => {
      this.updateForm(unit);
    });
  }

  updateForm(unit: IUnit) {
    this.editForm.patchValue({
      id: unit.id,
      unit: unit.unit,
      description: unit.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const unit = this.createFromForm();
    if (unit.id !== undefined) {
      this.subscribeToSaveResponse(this.unitService.update(unit));
    } else {
      this.subscribeToSaveResponse(this.unitService.create(unit));
    }
  }

  private createFromForm(): IUnit {
    return {
      ...new Unit(),
      id: this.editForm.get(['id']).value,
      unit: this.editForm.get(['unit']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUnit>>) {
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
