import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  DiscountComponent,
  DiscountDetailComponent,
  DiscountUpdateComponent,
  DiscountDeletePopupComponent,
  DiscountDeleteDialogComponent,
  discountRoute,
  discountPopupRoute
} from './';

const ENTITY_STATES = [...discountRoute, ...discountPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DiscountComponent,
    DiscountDetailComponent,
    DiscountUpdateComponent,
    DiscountDeleteDialogComponent,
    DiscountDeletePopupComponent
  ],
  entryComponents: [DiscountComponent, DiscountUpdateComponent, DiscountDeleteDialogComponent, DiscountDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysDiscountModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
