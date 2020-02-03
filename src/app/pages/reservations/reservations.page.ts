import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ReservationModel } from 'src/app/models/schedule.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: 'reservations.page.html',
  styleUrls: ['reservations.page.scss']
})
export class ReservationsPage implements OnInit {

  emptyFilter$: Observable<boolean>;
  reservations$: Observable<ReservationModel[]>;

  constructor(
    public reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    this.reservationService.load();
    this.emptyFilter$ = this.reservationService.emptyFilterSubject.asObservable();
    this.reservations$ = this.reservationService.reservationSubject.asObservable();
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

}
