import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  UnitComponent,
  UnitDetailComponent,
  UnitUpdateComponent,
  UnitDeletePopupComponent,
  UnitDeleteDialogComponent,
  unitRoute,
  unitPopupRoute
} from './';

const ENTITY_STATES = [...unitRoute, ...unitPopupRoute];

@NgModule({
  imports: [CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [UnitComponent, UnitDetailComponent, UnitUpdateComponent, UnitDeleteDialogComponent, UnitDeletePopupComponent],
  entryComponents: [UnitComponent, UnitUpdateComponent, UnitDeleteDialogComponent, UnitDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysUnitModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
