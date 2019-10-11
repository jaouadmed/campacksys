import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.CampacksysClientModule)
      },
      {
        path: 'supplier',
        loadChildren: () => import('./supplier/supplier.module').then(m => m.CampacksysSupplierModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.CampacksysEmployeeModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.CampacksysTeamModule)
      },
      {
        path: 'mission',
        loadChildren: () => import('./mission/mission.module').then(m => m.CampacksysMissionModule)
      },
      {
        path: 'duration',
        loadChildren: () => import('./duration/duration.module').then(m => m.CampacksysDurationModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CampacksysCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.CampacksysProductModule)
      },
      /*{
        path: 'stock',
        loadChildren: () => import('./stock/stock.module').then(m => m.CampacksysStockModule)
      },*/
      {
        path: 'unit',
        loadChildren: () => import('./unit/unit.module').then(m => m.CampacksysUnitModule)
      },
      {
        path: 'alert',
        loadChildren: () => import('./alert/alert.module').then(m => m.CampacksysAlertModule)
      },
      {
        path: 'order-stock',
        loadChildren: () => import('./order-stock/order-stock.module').then(m => m.CampacksysOrderStockModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.CampacksysOrderModule)
      },
      {
        path: 'item-line',
        loadChildren: () => import('./item-line/item-line.module').then(m => m.CampacksysItemLineModule)
      },
      {
        path: 'discount',
        loadChildren: () => import('./discount/discount.module').then(m => m.CampacksysDiscountModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./payment/payment.module').then(m => m.CampacksysPaymentModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./bill/bill.module').then(m => m.CampacksysBillModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CampacksysEntityModule {}
