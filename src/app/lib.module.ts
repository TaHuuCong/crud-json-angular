import { NgModule } from '@angular/core';
import { MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NotifierModule, NotifierOptions } from 'angular-notifier';

const MODULES = [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
];

@NgModule({
    imports: [
        ...MODULES
    ],
    exports: [
        ...MODULES
    ]
})
export class LibModule { }
