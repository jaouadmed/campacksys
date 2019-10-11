import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    children: [
      { path: 'product', loadChildren: () => import(`./product/product.module`).then(m => m.CampacksysProductModule) },
      { path: 'category', loadChildren: () => import(`./category/category.module`).then(m => m.CampacksysCategoryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {}
