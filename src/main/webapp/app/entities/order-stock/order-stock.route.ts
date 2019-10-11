import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OrderStock } from 'app/shared/model/order-stock.model';
import { OrderStockService } from './order-stock.service';
import { OrderStockComponent } from './order-stock.component';
import { OrderStockDetailComponent } from './order-stock-detail.component';
import { OrderStockUpdateComponent } from './order-stock-update.component';
import { OrderStockDeletePopupComponent } from './order-stock-delete-dialog.component';
import { IOrderStock } from 'app/shared/model/order-stock.model';

@Injectable({ providedIn: 'root' })
export class OrderStockResolve implements Resolve<IOrderStock> {
  constructor(private service: OrderStockService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrderStock> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OrderStock>) => response.ok),
        map((orderStock: HttpResponse<OrderStock>) => orderStock.body)
      );
    }
    return of(new OrderStock());
  }
}

export const orderStockRoute: Routes = [
  {
    path: '',
    component: OrderStockComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.orderStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OrderStockDetailComponent,
    resolve: {
      orderStock: OrderStockResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.orderStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OrderStockUpdateComponent,
    resolve: {
      orderStock: OrderStockResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.orderStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OrderStockUpdateComponent,
    resolve: {
      orderStock: OrderStockResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.orderStock.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const orderStockPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OrderStockDeletePopupComponent,
    resolve: {
      orderStock: OrderStockResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.orderStock.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
