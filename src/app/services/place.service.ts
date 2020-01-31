import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { PlaceModel } from '../models/place.model';
import { SearchPlaceModel } from '../pages/search-places/search-places.page';

@Injectable({ providedIn: 'root' })
export class PlaceService {

    places: PlaceModel[];
    placeSubject = new BehaviorSubject<PlaceModel[]>([]);

    constructor(
        private httpClient: HttpClient
    ) { }

    load() {
        this.get()
            .subscribe(
                (list) => this.places = list,
                () => this.placeSubject.next([]));
    }

    search(data: SearchPlaceModel) {
        try {
            const filtered = this.filter(this.places, data);
            this.placeSubject.next(filtered);
        } catch (error) {
            console.error(error);
        }
    }

    filter(list: PlaceModel[], data: SearchPlaceModel) {
        return list.filter(item =>
            !!data.keyWord &&
            (
                item.city.toLocaleLowerCase().indexOf(data.keyWord.toLocaleLowerCase()) !== -1 ||
                item.name.toLocaleLowerCase().indexOf(data.keyWord.toLocaleLowerCase()) !== -1
            )
        );
    }

    get(): Observable<PlaceModel[]> {
        return this.httpClient.get<PlaceModel[]>(environment.apiUrl.places);
    }

    create(data: PlaceModel): Observable<any> {
        return this.httpClient.post<PlaceModel>(environment.apiUrl.places, data);
    }

}