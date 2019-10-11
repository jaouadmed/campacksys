import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMission } from 'app/shared/model/mission.model';
import { MissionService } from './mission.service';

@Component({
  selector: 'jhi-mission-delete-dialog',
  templateUrl: './mission-delete-dialog.component.html'
})
export class MissionDeleteDialogComponent {
  mission: IMission;

  constructor(protected missionService: MissionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.missionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'missionListModification',
        content: 'Deleted an mission'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mission-delete-popup',
  template: ''
})
export class MissionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mission }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MissionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.mission = mission;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mission', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mission', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
