import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlert } from 'app/shared/model/alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'jhi-alert-delete-dialog',
  templateUrl: './alert-delete-dialog.component.html'
})
export class AlertDeleteDialogComponent {
  alert: IAlert;

  constructor(protected alertService: AlertService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.alertService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'alertListModification',
        content: 'Deleted an alert'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-alert-delete-popup',
  template: ''
})
export class AlertDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ alert }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlertDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.alert = alert;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/alert', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/alert', { outlets: { popup: null } }]);
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
