import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SvgAscComponent } from './svg-asc/svg-asc.component';
import { SvgDescComponent } from './svg-desc/svg-desc.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    SearchComponent,
    SvgAscComponent,
    SvgDescComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
