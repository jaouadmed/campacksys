import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemLine } from 'app/shared/model/item-line.model';
import { ItemLineService } from './item-line.service';
import { ItemLineComponent } from './item-line.component';
import { ItemLineDetailComponent } from './item-line-detail.component';
import { ItemLineUpdateComponent } from './item-line-update.component';
import { ItemLineDeletePopupComponent } from './item-line-delete-dialog.component';
import { IItemLine } from 'app/shared/model/item-line.model';

@Injectable({ providedIn: 'root' })
export class ItemLineResolve implements Resolve<IItemLine> {
  constructor(private service: ItemLineService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemLine> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemLine>) => response.ok),
        map((itemLine: HttpResponse<ItemLine>) => itemLine.body)
      );
    }
    return of(new ItemLine());
  }
}

export const itemLineRoute: Routes = [
  {
    path: '',
    component: ItemLineComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.itemLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemLineDetailComponent,
    resolve: {
      itemLine: ItemLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.itemLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemLineUpdateComponent,
    resolve: {
      itemLine: ItemLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.itemLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemLineUpdateComponent,
    resolve: {
      itemLine: ItemLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.itemLine.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemLinePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemLineDeletePopupComponent,
    resolve: {
      itemLine: ItemLineResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.itemLine.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
