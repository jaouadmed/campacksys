import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampacksysSharedModule } from '../../../shared';
import { ChartModule } from 'primeng/primeng';

import { PolarareachartDemoComponent, polarareachartDemoRoute } from '../../charts/polarareachart';

const primeng_STATES = [polarareachartDemoRoute];

@NgModule({
  imports: [CampacksysSharedModule, ChartModule, RouterModule.forRoot(primeng_STATES, { useHash: true })],
  declarations: [PolarareachartDemoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysPolarareachartDemoModule {}
