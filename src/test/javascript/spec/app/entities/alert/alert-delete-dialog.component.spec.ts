/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampacksysTestModule } from '../../../test.module';
import { AlertDeleteDialogComponent } from 'app/entities/alert/alert-delete-dialog.component';
import { AlertService } from 'app/entities/alert/alert.service';

describe('Component Tests', () => {
  describe('Alert Management Delete Component', () => {
    let comp: AlertDeleteDialogComponent;
    let fixture: ComponentFixture<AlertDeleteDialogComponent>;
    let service: AlertService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [AlertDeleteDialogComponent]
      })
        .overrideTemplate(AlertDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlertDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlertService);
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
