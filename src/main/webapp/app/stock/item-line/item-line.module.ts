import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  ItemLineComponent,
  ItemLineDetailComponent,
  ItemLineUpdateComponent,
  ItemLineDeletePopupComponent,
  ItemLineDeleteDialogComponent,
  itemLineRoute,
  itemLinePopupRoute
} from './';

const ENTITY_STATES = [...itemLineRoute, ...itemLinePopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemLineComponent,
    ItemLineDetailComponent,
    ItemLineUpdateComponent,
    ItemLineDeleteDialogComponent,
    ItemLineDeletePopupComponent
  ],
  entryComponents: [ItemLineComponent, ItemLineUpdateComponent, ItemLineDeleteDialogComponent, ItemLineDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysItemLineModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
