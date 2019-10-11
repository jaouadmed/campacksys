/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampacksysTestModule } from '../../../test.module';
import { DurationDeleteDialogComponent } from 'app/entities/duration/duration-delete-dialog.component';
import { DurationService } from 'app/entities/duration/duration.service';

describe('Component Tests', () => {
  describe('Duration Management Delete Component', () => {
    let comp: DurationDeleteDialogComponent;
    let fixture: ComponentFixture<DurationDeleteDialogComponent>;
    let service: DurationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [DurationDeleteDialogComponent]
      })
        .overrideTemplate(DurationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DurationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DurationService);
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
