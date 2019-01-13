import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editor } from './editor';

const BASE_URL = 'http://localhost:1234/editor';

@Injectable({
    providedIn: 'root'
})
export class MyEditorService {
    constructor(private http: HttpClient) {}

    getAllEditors(): Observable<Editor[]> {
        return this.http.get<Editor[]>(`${BASE_URL}`);
    }

    getEditorById(id): Observable<Editor> {
        return this.http.get<Editor>(`${BASE_URL}/${id}`);
    }

    addNewEditor(editor: Editor): Observable<any> {
        return this.http.post(`${BASE_URL}`, editor);
    }

    deleteEditor(id): Observable<any> {
        return this.http.delete(`${BASE_URL}/${id}`);
    }

    updateEditor(editor: Editor): Observable<any> {
        return this.http.put(`${BASE_URL}/` + editor.id, editor);
    }
}
