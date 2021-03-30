import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'manage',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./manage/manage-routing.module').then(m => m.FireappCafeManageRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'about-us',
          loadChildren: () => import('./about-us/about-us.module').then(m => m.FireappAboutUsModule)
        },
        {
          path: 'product',
          loadChildren: () => import('./product/product-view.module').then(m => m.FireappProductModule)
        },
        {
          path: 'news',
          loadChildren: () => import('./news/news-view.module').then(m => m.FireappNewsModule)
        },
        {
          path: '',
          loadChildren: () => import('./product/product-seo.module').then(m => m.FireappProductSeoModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED, useHash: false }
    )
  ],
  exports: [RouterModule]
})
export class FireappCafeAppRoutingModule {}
