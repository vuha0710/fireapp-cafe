import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { ProductPublicDetailSeoComponent } from './product-detail-seo.component';
import { PRODUCT_SEO_ROUTE } from './product-seo.route';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild([PRODUCT_SEO_ROUTE]), FERootModule, FroalaViewModule, FroalaEditorModule],
  declarations: [ProductPublicDetailSeoComponent]
})
export class FireappProductSeoModule {}
