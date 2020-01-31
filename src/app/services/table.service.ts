import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { TableModel } from '../models/table.model';

@Injectable({ providedIn: 'root' })
export class TableService {

    disableSubject = new BehaviorSubject<boolean>(true);
    tableSubject = new BehaviorSubject<TableModel[]>([]);

    constructor(
        private httpClient: HttpClient
    ) { }

    load(roomId: number) {
        this.get(roomId)
            .subscribe(
                (list) => {
                    this.tableSubject.next(list);
                    this.disableSubject.next(false);
                },
                () => {
                    this.tableSubject.next([]);
                    this.disableSubject.next(true);
                });
    }

    get(roomId: number): Observable<TableModel[]> {
        return this.httpClient.get<TableModel[]>(environment.apiUrl.tables(roomId));
    }

    create(data: TableModel): Observable<any> {
        return this.httpClient.post<TableModel>(environment.apiUrl.tables(), data);
    }

}