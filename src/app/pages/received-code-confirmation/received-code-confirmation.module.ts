import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReceivedCodeConfirmationPage } from './received-code-confirmation.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ReceivedCodeConfirmationPage }])
  ],
  declarations: [ReceivedCodeConfirmationPage]
})
export class ReceivedCodeConfirmationPageModule {}
