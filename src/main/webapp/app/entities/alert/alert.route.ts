import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Alert } from 'app/shared/model/alert.model';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';
import { AlertDetailComponent } from './alert-detail.component';
import { AlertUpdateComponent } from './alert-update.component';
import { AlertDeletePopupComponent } from './alert-delete-dialog.component';
import { IAlert } from 'app/shared/model/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertResolve implements Resolve<IAlert> {
  constructor(private service: AlertService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlert> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Alert>) => response.ok),
        map((alert: HttpResponse<Alert>) => alert.body)
      );
    }
    return of(new Alert());
  }
}

export const alertRoute: Routes = [
  {
    path: '',
    component: AlertComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.alert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlertDetailComponent,
    resolve: {
      alert: AlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.alert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlertUpdateComponent,
    resolve: {
      alert: AlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.alert.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlertUpdateComponent,
    resolve: {
      alert: AlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.alert.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const alertPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlertDeletePopupComponent,
    resolve: {
      alert: AlertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.alert.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
