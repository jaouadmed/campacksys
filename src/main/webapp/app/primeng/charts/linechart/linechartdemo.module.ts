import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CampacksysSharedModule } from '../../../shared';
import { ChartModule } from 'primeng/primeng';

import { LinechartDemoComponent, linechartDemoRoute } from '../../charts/linechart';

const primeng_STATES = [linechartDemoRoute];

@NgModule({
  imports: [CampacksysSharedModule, ChartModule, RouterModule.forRoot(primeng_STATES, { useHash: true })],
  declarations: [LinechartDemoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysLinechartDemoModule {}
