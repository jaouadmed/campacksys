import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jhi-internals',
  templateUrl: './internals.component.html',
  styleUrls: ['./internals.component.scss']
})
export class InternalsComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      { label: 'employee', icon: 'fa fa-fw fa-user-circle-o', routerLink: ['employee'] },
      { label: 'team', icon: 'fa fa-fw fa-truck', routerLink: ['team'] },
      { label: 'mission', icon: 'fa fa-fw fa-truck', routerLink: ['mission'] },
      { label: 'duration', icon: 'fa fa-fw fa-truck', routerLink: ['duration'] }
    ];
  }
}
