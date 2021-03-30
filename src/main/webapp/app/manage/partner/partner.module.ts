import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { PartnerComponent } from './partner.component';
import { partnerRoute } from './partner.route';
import { PartnerViewComponent } from './partner-view.component';
import { PartnerDeleteDialogComponent } from './partner-delete-dialog.component';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild(partnerRoute)],
  declarations: [PartnerComponent, PartnerViewComponent, PartnerDeleteDialogComponent],
  entryComponents: [PartnerDeleteDialogComponent]
})
export class FireappCafePartnerModule {}
