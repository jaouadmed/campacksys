import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  OrderStockComponent,
  OrderStockDetailComponent,
  OrderStockUpdateComponent,
  OrderStockDeletePopupComponent,
  OrderStockDeleteDialogComponent,
  orderStockRoute,
  orderStockPopupRoute
} from './';

const ENTITY_STATES = [...orderStockRoute, ...orderStockPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrderStockComponent,
    OrderStockDetailComponent,
    OrderStockUpdateComponent,
    OrderStockDeleteDialogComponent,
    OrderStockDeletePopupComponent
  ],
  entryComponents: [OrderStockComponent, OrderStockUpdateComponent, OrderStockDeleteDialogComponent, OrderStockDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysOrderStockModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
