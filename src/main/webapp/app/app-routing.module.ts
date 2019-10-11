import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          loadChildren: () => import('./admin/admin.module').then(m => m.CampacksysAdminModule)
        },
        {
          path: 'externals',
          loadChildren: () => import(`./externals/externals.module`).then(m => m.ExternalsModule)
        },
        {
          path: 'internals',
          loadChildren: () => import(`./internals/internals.module`).then(m => m.InternalsModule)
        },
        {
          path: 'stock',
          loadChildren: () => import(`./stock/stock.module`).then(m => m.StockModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class CampacksysAppRoutingModule {}
