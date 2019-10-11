import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mission } from 'app/shared/model/mission.model';
import { MissionService } from './mission.service';
import { MissionComponent } from './mission.component';
import { MissionDetailComponent } from './mission-detail.component';
import { MissionUpdateComponent } from './mission-update.component';
import { MissionDeletePopupComponent } from './mission-delete-dialog.component';
import { IMission } from 'app/shared/model/mission.model';

@Injectable({ providedIn: 'root' })
export class MissionResolve implements Resolve<IMission> {
  constructor(private service: MissionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMission> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Mission>) => response.ok),
        map((mission: HttpResponse<Mission>) => mission.body)
      );
    }
    return of(new Mission());
  }
}

export const missionRoute: Routes = [
  {
    path: '',
    component: MissionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.mission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MissionDetailComponent,
    resolve: {
      mission: MissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.mission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MissionUpdateComponent,
    resolve: {
      mission: MissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.mission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MissionUpdateComponent,
    resolve: {
      mission: MissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.mission.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const missionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MissionDeletePopupComponent,
    resolve: {
      mission: MissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.mission.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
