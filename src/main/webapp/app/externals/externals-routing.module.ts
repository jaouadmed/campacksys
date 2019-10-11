import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalsComponent } from './externals.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalsComponent,
    children: [
      { path: 'client', loadChildren: () => import(`./client/client.module`).then(m => m.CampacksysClientModule) },
      { path: 'supplier', loadChildren: () => import(`./supplier/supplier.module`).then(m => m.CampacksysSupplierModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalsRoutingModule {}
