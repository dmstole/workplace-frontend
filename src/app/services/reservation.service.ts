import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ResponseModel } from '../models/response.model';
import { environment } from '../../environments/environment';
import { WorkPositionModel, ReservationModel } from '../models/schedule.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {

    emptyFilterSubject = new BehaviorSubject<boolean>(true);
    reservationSubject = new BehaviorSubject<ReservationModel[]>([]);

    constructor(
        private httpClient: HttpClient
    ) { }

    load() {
        this.get()
            .subscribe(
                (list) => {
                    this.reservationSubject.next(list);
                    this.emptyFilterSubject.next(false);
                },
                () => {
                    this.reservationSubject.next([]);
                    this.emptyFilterSubject.next(true);
                });
    }

    get(): Observable<ReservationModel[]> {
        return this.httpClient.get<ReservationModel[]>(environment.apiUrl.reservations);
    }

    reserve(data: WorkPositionModel) {
        return this.httpClient.post<ResponseModel>(environment.apiUrl.workPosition, data);
    }

}