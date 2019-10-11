import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  AlertComponent,
  AlertDetailComponent,
  AlertUpdateComponent,
  AlertDeletePopupComponent,
  AlertDeleteDialogComponent,
  alertRoute,
  alertPopupRoute
} from './';

const ENTITY_STATES = [...alertRoute, ...alertPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AlertComponent, AlertDetailComponent, AlertUpdateComponent, AlertDeleteDialogComponent, AlertDeletePopupComponent],
  entryComponents: [AlertComponent, AlertUpdateComponent, AlertDeleteDialogComponent, AlertDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysAlertModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
