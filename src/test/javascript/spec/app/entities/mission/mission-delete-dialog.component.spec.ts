/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CampacksysTestModule } from '../../../test.module';
import { MissionDeleteDialogComponent } from 'app/entities/mission/mission-delete-dialog.component';
import { MissionService } from 'app/entities/mission/mission.service';

describe('Component Tests', () => {
  describe('Mission Management Delete Component', () => {
    let comp: MissionDeleteDialogComponent;
    let fixture: ComponentFixture<MissionDeleteDialogComponent>;
    let service: MissionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CampacksysTestModule],
        declarations: [MissionDeleteDialogComponent]
      })
        .overrideTemplate(MissionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MissionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MissionService);
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
