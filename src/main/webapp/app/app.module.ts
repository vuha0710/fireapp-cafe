import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { FireappCafeSharedModule } from 'app/shared/shared.module';
import { FireappCafeCoreModule } from 'app/core/core.module';
import { FireappCafeAppRoutingModule } from './app-routing.module';
import { FireappCafeHomeModule } from './home/home.module';
import { FireappCafeEntityModule } from './entities/entity.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { FireappAboutUsModule } from 'app/about-us/about-us.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  imports: [
    BrowserModule,
    FireappCafeSharedModule,
    FireappCafeCoreModule,
    FireappCafeHomeModule,
    FireappAboutUsModule,
    FireappCafeEntityModule,
    FireappCafeAppRoutingModule,
    AngularEditorModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class FireappCafeAppModule {}
