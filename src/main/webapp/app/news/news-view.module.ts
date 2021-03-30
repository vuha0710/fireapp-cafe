import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { newsViewRoute } from './news-view.route';
import { NewsViewComponent } from './news-view.component';
import { NewsPublicDetailComponent } from './news-detail.component';
import { FERootModule, FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild(newsViewRoute), FERootModule, FroalaViewModule, FroalaEditorModule],
  declarations: [NewsViewComponent, NewsPublicDetailComponent]
})
export class FireappNewsModule {}
