import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CampacksysSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CampacksysSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CampacksysSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysSharedModule {
  static forRoot() {
    return {
      ngModule: CampacksysSharedModule
    };
  }
}
