import { Route } from '@angular/router';

import { AboutUsComponent } from './about-us.component';

export const ABOUT_US_ROUTE: Route = {
  path: '',
  component: AboutUsComponent,
  data: {
    pageTitle: 'Mộc Vinh Hoa!'
  }
};
