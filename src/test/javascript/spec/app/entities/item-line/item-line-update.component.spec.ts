/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { ItemLineUpdateComponent } from 'app/entities/item-line/item-line-update.component';
import { ItemLineService } from 'app/entities/item-line/item-line.service';
import { ItemLine } from 'app/shared/model/item-line.model';

describe('Component Tests', () => {
  describe('ItemLine Management Update Component', () => {
    let comp: ItemLineUpdateComponent;
    let fixture: ComponentFixture<ItemLineUpdateComponent>;
    let service: ItemLineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [ItemLineUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemLineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemLineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemLineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemLine(123);
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
        const entity = new ItemLine();
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
