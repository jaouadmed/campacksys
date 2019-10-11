/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampacksysTestModule } from '../../../test.module';
import { OrderStockDeleteDialogComponent } from 'app/entities/order-stock/order-stock-delete-dialog.component';
import { OrderStockService } from 'app/entities/order-stock/order-stock.service';

describe('Component Tests', () => {
  describe('OrderStock Management Delete Component', () => {
    let comp: OrderStockDeleteDialogComponent;
    let fixture: ComponentFixture<OrderStockDeleteDialogComponent>;
    let service: OrderStockService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [OrderStockDeleteDialogComponent]
      })
        .overrideTemplate(OrderStockDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderStockDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderStockService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
