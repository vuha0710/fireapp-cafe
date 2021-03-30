import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { ABOUT_US_ROUTE } from './about-us.route';
import { AboutUsComponent } from './about-us.component';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild([ABOUT_US_ROUTE])],
  declarations: [AboutUsComponent]
})
export class FireappAboutUsModule {}
