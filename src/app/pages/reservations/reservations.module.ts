import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsPage } from './reservations.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ReservationsPage }])
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
