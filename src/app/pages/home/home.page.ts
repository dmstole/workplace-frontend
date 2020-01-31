import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterViewInit {

  filteredPlaces$: Observable<PlaceModel[]>;

  constructor(
    public router: Router,
    public placeService: PlaceService,
  ) {
  }

  ngAfterViewInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.filteredPlaces$ = this.placeService.placeSubject.asObservable();
  }

  goToSchedule(place: PlaceModel) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        place: place.id
      }
    };
    this.router.navigate(['/tabs/schedule'], navigationExtras);
  }

}
