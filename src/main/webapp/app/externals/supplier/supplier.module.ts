import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  SupplierComponent,
  SupplierDetailComponent,
  SupplierUpdateComponent,
  SupplierDeletePopupComponent,
  SupplierDeleteDialogComponent,
  supplierRoute,
  supplierPopupRoute
} from './';

const ENTITY_STATES = [...supplierRoute, ...supplierPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SupplierComponent,
    SupplierDetailComponent,
    SupplierUpdateComponent,
    SupplierDeleteDialogComponent,
    SupplierDeletePopupComponent
  ],
  entryComponents: [SupplierComponent, SupplierUpdateComponent, SupplierDeleteDialogComponent, SupplierDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysSupplierModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
