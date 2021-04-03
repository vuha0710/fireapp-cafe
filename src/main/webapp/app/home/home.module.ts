import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { HomeBannerComponent } from 'app/home/home-banner/home-banner.component';
import { HomeCompanyIntroComponent } from 'app/home/home-company-intro/home-company-intro.component';
import { HomePartnerComponent } from 'app/home/home-partner/home-partner.component';
import { HomeProductComponent } from 'app/home/home-product/home-product.component';
import { HomeNewsComponent } from 'app/home/home-news/home-news.component';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild([HOME_ROUTE]), FERootModule, FroalaViewModule, FroalaEditorModule],
  declarations: [
    HomeComponent,
    HomeBannerComponent,
    HomeCompanyIntroComponent,
    HomePartnerComponent,
    HomeProductComponent,
    HomeNewsComponent
  ]
})
export class FireappCafeHomeModule {}
