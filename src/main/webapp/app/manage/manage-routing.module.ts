import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'partner',
        loadChildren: () => import('./partner/partner.module').then(m => m.FireappCafePartnerModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.FireappCafeProductModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then(m => m.FireappCafeNewsModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.FireappCafeContactModule)
      }
    ])
  ]
})
export class FireappCafeManageRoutingModule {}
