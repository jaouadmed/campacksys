import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jhi-externals',
  templateUrl: './externals.component.html',
  styleUrls: ['./externals.component.scss']
})
export class ExternalsComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'client', icon: 'fa fa-fw fa-user-circle-o', routerLink: ['client'] },
      { label: 'supplier', icon: 'fa fa-fw fa-truck', routerLink: ['supplier'] }
    ];
  }
}
