import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { CoreModule } from 'projects/core/src';
import { FormComponent } from 'projects/core/src/lib/feature-form/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormPopupComponent } from 'projects/core/src/lib/feature-form/form-popup/form-popup.component';
import { MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  entryComponents: [
    FormPopupComponent,
  ],
  bootstrap: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {
  constructor(injector: Injector) {
    customElements.define('flamingo-wegvak-popup', createCustomElement(FormPopupComponent, {injector}));
  }
  public ngDoBootstrap() {}
}
