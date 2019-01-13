import { Routes } from '@angular/router';
import { EditorListComponent } from './editor-list/editor-list.component';
import { EditorDetailComponent } from './editor-detail/editor-detail.component';

export const editorRoute: Routes = [
    { path: 'editor/list', component: EditorListComponent },
    { path: 'editor/:create', component: EditorDetailComponent },
    { path: 'editor/:id/:operation', component: EditorDetailComponent }
];
