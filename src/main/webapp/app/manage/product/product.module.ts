import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './product.component';
import { ProductViewComponent } from './product-view.component';
import { productRoute } from './product.route';
import { ProductDeleteDialogComponent } from 'app/manage/product/product-delete-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    FireappCafeSharedModule,
    RouterModule.forChild(productRoute),
    AngularEditorModule,
    FERootModule,
    FroalaViewModule,
    FroalaEditorModule
  ],
  declarations: [ProductComponent, ProductViewComponent, ProductDeleteDialogComponent],
  entryComponents: [ProductDeleteDialogComponent]
})
export class FireappCafeProductModule {}
