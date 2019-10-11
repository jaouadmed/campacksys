import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Duration } from 'app/shared/model/duration.model';
import { DurationService } from './duration.service';
import { DurationComponent } from './duration.component';
import { DurationDetailComponent } from './duration-detail.component';
import { DurationUpdateComponent } from './duration-update.component';
import { DurationDeletePopupComponent } from './duration-delete-dialog.component';
import { IDuration } from 'app/shared/model/duration.model';

@Injectable({ providedIn: 'root' })
export class DurationResolve implements Resolve<IDuration> {
  constructor(private service: DurationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDuration> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Duration>) => response.ok),
        map((duration: HttpResponse<Duration>) => duration.body)
      );
    }
    return of(new Duration());
  }
}

export const durationRoute: Routes = [
  {
    path: '',
    component: DurationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.duration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DurationDetailComponent,
    resolve: {
      duration: DurationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.duration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DurationUpdateComponent,
    resolve: {
      duration: DurationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.duration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DurationUpdateComponent,
    resolve: {
      duration: DurationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.duration.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const durationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DurationDeletePopupComponent,
    resolve: {
      duration: DurationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.duration.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
