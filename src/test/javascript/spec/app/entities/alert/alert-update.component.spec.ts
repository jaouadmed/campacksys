/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { AlertUpdateComponent } from 'app/entities/alert/alert-update.component';
import { AlertService } from 'app/entities/alert/alert.service';
import { Alert } from 'app/shared/model/alert.model';

describe('Component Tests', () => {
  describe('Alert Management Update Component', () => {
    let comp: AlertUpdateComponent;
    let fixture: ComponentFixture<AlertUpdateComponent>;
    let service: AlertService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [AlertUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlertUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlertUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Alert(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Alert();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
