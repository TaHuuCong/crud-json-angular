import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryModule } from './country/country.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatetimePickerModule } from './datetime-picker/datetime-picker.module';
import { MyEditorModule } from './editor/editor.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NgbModule,
    DatetimePickerModule,
    CountryModule,
    MyEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
