/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampacksysTestModule } from '../../../test.module';
import { ItemLineDeleteDialogComponent } from 'app/entities/item-line/item-line-delete-dialog.component';
import { ItemLineService } from 'app/entities/item-line/item-line.service';

describe('Component Tests', () => {
  describe('ItemLine Management Delete Component', () => {
    let comp: ItemLineDeleteDialogComponent;
    let fixture: ComponentFixture<ItemLineDeleteDialogComponent>;
    let service: ItemLineService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [ItemLineDeleteDialogComponent]
      })
        .overrideTemplate(ItemLineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemLineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemLineService);
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
