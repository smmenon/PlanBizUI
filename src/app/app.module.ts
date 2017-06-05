import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import {AuthService} from "../shared/services/auth.service";
import {SelfbitsAngularModule, SelfbitsAngular} from "selfbits-angular2-sdk";

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

  export interface AppConfig {
    BASE_URL:string,
    APP_ID:string,
    APP_SECRET:string
  };

  export const APPCONFIG:AppConfig = {
      BASE_URL: 'https://pb1-api.selfbits.io',
      APP_ID: 'd359a886ef82863e46894ed954e1a4a0',
      APP_SECRET: '8b6fb836c769980deb300a6e48080ede',
  };

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App 
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AuthService,
    SelfbitsAngularModule,
    SelfbitsAngular,
    {provide:'APP_CONFIG_TOKEN', useValue:APPCONFIG}
  ]
})

export class AppModule {
  constructor(public appState: AppState) {
      SelfbitsAngularModule.initializeApp(APPCONFIG); 
  }
}
