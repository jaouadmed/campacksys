import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  OrderComponent,
  OrderDetailComponent,
  OrderUpdateComponent,
  OrderDeletePopupComponent,
  OrderDeleteDialogComponent,
  orderRoute,
  orderPopupRoute
} from './';

const ENTITY_STATES = [...orderRoute, ...orderPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [OrderComponent, OrderDetailComponent, OrderUpdateComponent, OrderDeleteDialogComponent, OrderDeletePopupComponent],
  entryComponents: [OrderComponent, OrderUpdateComponent, OrderDeleteDialogComponent, OrderDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysOrderModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
