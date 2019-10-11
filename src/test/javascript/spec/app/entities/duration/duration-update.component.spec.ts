/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { DurationUpdateComponent } from 'app/entities/duration/duration-update.component';
import { DurationService } from 'app/entities/duration/duration.service';
import { Duration } from 'app/shared/model/duration.model';

describe('Component Tests', () => {
  describe('Duration Management Update Component', () => {
    let comp: DurationUpdateComponent;
    let fixture: ComponentFixture<DurationUpdateComponent>;
    let service: DurationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [DurationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DurationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DurationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DurationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Duration(123);
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
        const entity = new Duration();
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
