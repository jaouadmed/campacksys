import { Route } from '@angular/router';
import { UserRouteAccessService } from '../../../core/auth/user-route-access-service';
import { ValidationDemoComponent } from './validationdemo.component';

export const validationDemoRoute: Route = {
  path: 'validation',
  component: ValidationDemoComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'primeng.misc.validation.title'
  },
  canActivate: [UserRouteAccessService]
};
