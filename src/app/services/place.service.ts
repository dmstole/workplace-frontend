import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { PlaceModel } from '../models/place.model';
import { ResponseModel } from '../models/response.model';
import { environment } from '../../environments/environment';
import { SearchPlaceModel } from '../pages/search-places/search-places.page';

@Injectable({
    providedIn: 'root'
})
export class PlaceService {

    places: PlaceModel[];
    placeSubject = new BehaviorSubject<PlaceModel[]>([]);
    emptyFilterSubject = new BehaviorSubject<boolean>(true);

    constructor(
        private httpClient: HttpClient
    ) { }

    search(data: SearchPlaceModel): void {
        this.get(data.keyWord)
            .subscribe((list) => {
                this.placeSubject.next(list);
                this.emptyFilterSubject.next(list.length === 0);
            });
    }

    get(keyWord: string): Observable<PlaceModel[]> {
        return this.httpClient.get<PlaceModel[]>(environment.apiUrl.places(keyWord));
    }

    create(data: PlaceModel): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(environment.apiUrl.places(), data);
    }

}

