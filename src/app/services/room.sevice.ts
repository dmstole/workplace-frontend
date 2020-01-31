import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { RoomModel } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {

    disableSubject = new BehaviorSubject<boolean>(true);
    roomSubject = new BehaviorSubject<RoomModel[]>([]);

    constructor(
        private httpClient: HttpClient
    ) { }

    load(departamentId: number) {
        this.get(departamentId)
            .subscribe(
                (list) => {
                    this.roomSubject.next(list);
                    this.disableSubject.next(false);
                },
                () => {
                    this.roomSubject.next([]);
                    this.disableSubject.next(true);
                });
    }

    get(departamentId: number): Observable<RoomModel[]> {
        return this.httpClient.get<RoomModel[]>(environment.apiUrl.rooms(departamentId));
    }s

    create(data: RoomModel): Observable<any> {
        return this.httpClient.post<RoomModel>(environment.apiUrl.rooms(), data);
    }

}