import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { NewsComponent } from './news.component';
import { NewsViewComponent } from './news-view.component';
import { newsRoute } from './news.route';
import { NewsDeleteDialogComponent } from './news-delete-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    FireappCafeSharedModule,
    RouterModule.forChild(newsRoute),
    AngularEditorModule,
    FERootModule,
    FroalaViewModule,
    FroalaEditorModule
  ],
  declarations: [NewsComponent, NewsViewComponent, NewsDeleteDialogComponent],
  entryComponents: [NewsDeleteDialogComponent]
})
export class FireappCafeNewsModule {}
