import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDuration } from 'app/shared/model/duration.model';
import { DurationService } from './duration.service';

@Component({
  selector: 'jhi-duration-delete-dialog',
  templateUrl: './duration-delete-dialog.component.html'
})
export class DurationDeleteDialogComponent {
  duration: IDuration;

  constructor(protected durationService: DurationService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.durationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'durationListModification',
        content: 'Deleted an duration'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-duration-delete-popup',
  template: ''
})
export class DurationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ duration }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DurationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.duration = duration;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/duration', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/duration', { outlets: { popup: null } }]);
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
