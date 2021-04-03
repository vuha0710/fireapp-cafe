import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { FireappCafeAppModule } from './app.module';
import { MainComponent } from './layouts/main/main.component';

@NgModule({
  imports: [FireappCafeAppModule, ServerModule],
  bootstrap: [MainComponent]
})
export class JhipsterAppServerModule {}
