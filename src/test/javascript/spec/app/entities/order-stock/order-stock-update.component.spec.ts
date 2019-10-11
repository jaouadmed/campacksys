/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { CampacksysTestModule } from '../../../test.module';
import { OrderStockUpdateComponent } from 'app/entities/order-stock/order-stock-update.component';
import { OrderStockService } from 'app/entities/order-stock/order-stock.service';
import { OrderStock } from 'app/shared/model/order-stock.model';

describe('Component Tests', () => {
  describe('OrderStock Management Update Component', () => {
    let comp: OrderStockUpdateComponent;
    let fixture: ComponentFixture<OrderStockUpdateComponent>;
    let service: OrderStockService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [OrderStockUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OrderStockUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderStockUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderStockService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderStock(123);
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
        const entity = new OrderStock();
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
