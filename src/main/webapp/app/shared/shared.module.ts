import { NgModule } from '@angular/core';
import { FireappCafeSharedLibsModule } from './shared-libs.module';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { UploadImageComponent } from 'app/shared/component/upload-image/upload-image.component';

@NgModule({
  imports: [FireappCafeSharedLibsModule],
  declarations: [AlertComponent, AlertErrorComponent, LoginModalComponent, HasAnyAuthorityDirective, UploadImageComponent],
  entryComponents: [LoginModalComponent],
  exports: [
    FireappCafeSharedLibsModule,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    UploadImageComponent
  ]
})
export class FireappCafeSharedModule {}
