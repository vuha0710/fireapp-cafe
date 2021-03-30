import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { productViewRoute } from './product-view.route';
import { ProductViewComponent } from './product-view.component';
import { ProductPublicDetailComponent } from './product-detail.component';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild(productViewRoute), FERootModule, FroalaViewModule, FroalaEditorModule],
  declarations: [ProductViewComponent, ProductPublicDetailComponent]
})
export class FireappProductModule {}
