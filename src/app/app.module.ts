import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FoodModule } from './food'
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FoodModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
