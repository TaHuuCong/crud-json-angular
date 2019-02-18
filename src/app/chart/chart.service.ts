import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const BASE_URL = '';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    constructor(
        private http: HttpClient
    ) { }
}
