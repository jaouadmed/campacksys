import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemLine } from 'app/shared/model/item-line.model';
import { ItemLineService } from './item-line.service';

@Component({
  selector: 'jhi-item-line-delete-dialog',
  templateUrl: './item-line-delete-dialog.component.html'
})
export class ItemLineDeleteDialogComponent {
  itemLine: IItemLine;

  constructor(protected itemLineService: ItemLineService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemLineService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemLineListModification',
        content: 'Deleted an itemLine'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-line-delete-popup',
  template: ''
})
export class ItemLineDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemLine }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemLineDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemLine = itemLine;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-line', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-line', { outlets: { popup: null } }]);
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
