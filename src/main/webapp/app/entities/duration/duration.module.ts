import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  DurationComponent,
  DurationDetailComponent,
  DurationUpdateComponent,
  DurationDeletePopupComponent,
  DurationDeleteDialogComponent,
  durationRoute,
  durationPopupRoute
} from './';

const ENTITY_STATES = [...durationRoute, ...durationPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DurationComponent,
    DurationDetailComponent,
    DurationUpdateComponent,
    DurationDeleteDialogComponent,
    DurationDeletePopupComponent
  ],
  entryComponents: [DurationComponent, DurationUpdateComponent, DurationDeleteDialogComponent, DurationDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysDurationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
