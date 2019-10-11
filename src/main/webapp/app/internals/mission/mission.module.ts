import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { CampacksysSharedModule } from 'app/shared';
import {
  MissionComponent,
  MissionDetailComponent,
  MissionUpdateComponent,
  MissionDeletePopupComponent,
  MissionDeleteDialogComponent,
  missionRoute,
  missionPopupRoute
} from './';

import { FullCalendarModule, FullCalendar } from 'primeng/fullcalendar';

const ENTITY_STATES = [...missionRoute, ...missionPopupRoute];

@NgModule({
  imports: [FullCalendarModule, CampacksysSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MissionComponent,
    MissionDetailComponent,
    MissionUpdateComponent,
    MissionDeleteDialogComponent,
    MissionDeletePopupComponent
  ],
  entryComponents: [MissionComponent, MissionUpdateComponent, MissionDeleteDialogComponent, MissionDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysMissionModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
