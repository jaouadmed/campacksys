import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [StockComponent],
  imports: [CommonModule, StockRoutingModule, TabMenuModule]
})
export class StockModule {}
