import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalsRoutingModule } from './externals-routing.module';
import { ExternalsComponent } from './externals.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [ExternalsComponent],
  imports: [CommonModule, ExternalsRoutingModule, TabMenuModule]
})
export class ExternalsModule {}
