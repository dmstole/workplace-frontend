import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';

import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';
import { DepartamentService } from 'src/app/services/departament.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  emptyFilter$: Observable<boolean>;
  filteredPlaces$: Observable<PlaceModel[]>;

  constructor(
    public router: Router,
    public placeService: PlaceService,
    public departamentService: DepartamentService,
  ) { }

  /**
   * Home - Iniciate home page.
   *
   * @memberof HomePage
   * @author Diogo A. Miranda
   */
  ngOnInit() {
    this.configureCards();
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }


  /**
   * Home - Configure list of places filtered.
   *
   * @memberof HomePage
   * @author Diogo A. Miranda
   */
  configureCards() {
    this.emptyFilter$ = this.placeService.emptyFilterSubject.asObservable();
    this.filteredPlaces$ = this.placeService.placeSubject.asObservable();
  }

  /**
   * Home - Go to schedule page.
   *
   * @memberof HomePage
   * @author Diogo A. Miranda
   */
  goSchedulePage(place: PlaceModel) {
    this.departamentService.load(place.id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        place: place.id
      }
    };
    this.router.navigate(['/tabs/schedule'], navigationExtras);
  }

  /**
   * Home - Go to search places page.
   *
   * @memberof HomePage
   * @author Diogo A. Miranda
   */
  goToSearchPlacesPage() {
    this.router.navigateByUrl("/tabs/search-places");
  }

}
