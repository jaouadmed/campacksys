import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { SupplierComponent } from './supplier.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierUpdateComponent } from './supplier-update.component';
import { SupplierDeletePopupComponent } from './supplier-delete-dialog.component';
import { ISupplier } from 'app/shared/model/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierResolve implements Resolve<ISupplier> {
  constructor(private service: SupplierService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISupplier> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Supplier>) => response.ok),
        map((supplier: HttpResponse<Supplier>) => supplier.body)
      );
    }
    return of(new Supplier());
  }
}

export const supplierRoute: Routes = [
  {
    path: '',
    component: SupplierComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'campacksysApp.supplier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupplierDetailComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.supplier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupplierUpdateComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.supplier.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupplierUpdateComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.supplier.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const supplierPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SupplierDeletePopupComponent,
    resolve: {
      supplier: SupplierResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'campacksysApp.supplier.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
