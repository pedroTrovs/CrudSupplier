import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CrudSuppliersComponent } from './crud-suppliers/crud-suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudSuppliersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
