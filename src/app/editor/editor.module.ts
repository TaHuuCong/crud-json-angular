import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { MyEditorService } from './editor.service';
import { EditorModule } from '@tinymce/tinymce-angular';
import { editorRoute } from './editor.route';
import { EditorListComponent } from './editor-list/editor-list.component';
import { EditorDetailComponent } from './editor-detail/editor-detail.component';
import { LibModule } from '../lib.module';

@NgModule({
    declarations: [
        EditorDetailComponent,
        EditorListComponent
    ],
    imports: [
        RouterModule.forChild(editorRoute),
        LibModule,
        EditorModule,
    ],
    providers: [
        MyEditorService,
    ],
})
export class MyEditorModule { }
