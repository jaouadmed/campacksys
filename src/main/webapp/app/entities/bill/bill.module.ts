import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  BillComponent,
  BillDetailComponent,
  BillUpdateComponent,
  BillDeletePopupComponent,
  BillDeleteDialogComponent,
  billRoute,
  billPopupRoute
} from './';

const ENTITY_STATES = [...billRoute, ...billPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BillComponent, BillDetailComponent, BillUpdateComponent, BillDeleteDialogComponent, BillDeletePopupComponent],
  entryComponents: [BillComponent, BillUpdateComponent, BillDeleteDialogComponent, BillDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysBillModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
