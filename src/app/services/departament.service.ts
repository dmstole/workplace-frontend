import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { DepartamentModel } from '../models/departament.model';

@Injectable({ providedIn: 'root' })
export class DepartamentService {

    departaments: DepartamentModel[];
    departamentSubject = new BehaviorSubject<DepartamentModel[]>([]);

    constructor(
        private httpClient: HttpClient
    ) { }

    load(placeId: number) {
        this.get(placeId)
            .subscribe(
                (list) => this.departamentSubject.next(list),
                () => this.departamentSubject.next([]));
    }

    get(placeId: number): Observable<DepartamentModel[]> {
        return this.httpClient.get<DepartamentModel[]>(`${environment.apiUrl.root}/place/${placeId}/${environment.apiUrl.departaments}`);
    }

    create(data: DepartamentModel): Observable<any> {
        return this.httpClient.post<DepartamentModel>(`${environment.apiUrl.root}${environment.apiUrl.departaments}`, data);
    }

}