import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorageModule } from 'storage';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StorageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
