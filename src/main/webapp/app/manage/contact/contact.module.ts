import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { contactRoute } from './contact.route';
import { ContactDeleteDialogComponent } from 'app/manage/contact/contact-delete-dialog.component';

@NgModule({
  imports: [FireappCafeSharedModule, RouterModule.forChild(contactRoute)],
  declarations: [ContactComponent, ContactDetailComponent, ContactDeleteDialogComponent],
  entryComponents: [ContactDeleteDialogComponent]
})
export class FireappCafeContactModule {}
