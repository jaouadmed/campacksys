import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalsRoutingModule } from './internals-routing.module';
import { InternalsComponent } from './internals.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { FullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
  declarations: [InternalsComponent],
  imports: [CommonModule, InternalsRoutingModule, TabMenuModule, FullCalendarModule]
})
export class InternalsModule {}
