import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalsComponent } from './internals.component';

const routes: Routes = [
  {
    path: '',
    component: InternalsComponent,
    children: [
      { path: 'employee', loadChildren: () => import(`./employee/employee.module`).then(m => m.CampacksysEmployeeModule) },
      { path: 'team', loadChildren: () => import(`./team/team.module`).then(m => m.CampacksysTeamModule) },
      { path: 'mission', loadChildren: () => import(`./mission/mission.module`).then(m => m.CampacksysMissionModule) },
      { path: 'duration', loadChildren: () => import(`./duration/duration.module`).then(m => m.CampacksysDurationModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalsRoutingModule {}
