import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderStock } from 'app/shared/model/order-stock.model';
import { OrderStockService } from './order-stock.service';

@Component({
  selector: 'jhi-order-stock-delete-dialog',
  templateUrl: './order-stock-delete-dialog.component.html'
})
export class OrderStockDeleteDialogComponent {
  orderStock: IOrderStock;

  constructor(
    protected orderStockService: OrderStockService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.orderStockService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'orderStockListModification',
        content: 'Deleted an orderStock'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-order-stock-delete-popup',
  template: ''
})
export class OrderStockDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ orderStock }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OrderStockDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.orderStock = orderStock;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/order-stock', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/order-stock', { outlets: { popup: null } }]);
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
