import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { configureValidator, ValidatorPattern } from 'src/app/core/validator/custom.validator';
import { NavController } from '@ionic/angular';
import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-places',
  templateUrl: 'places.page.html',
  styleUrls: ['places.page.scss']
})
export class PlacesPage implements OnInit {

  public formPlace: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private placeService: PlaceService,
  ) { }

  ngOnInit() {
    this.configureForm();
  }

  configureForm() {
    this.formPlace = this.formBuilder.group({
      name: ['', configureValidator(true, 100, 4)],
      email: ['', configureValidator(true, 100, 4)],
      telephone: ['', configureValidator(true, 30, 10, ValidatorPattern.TELEPHONE)],
      streetName: [``, configureValidator(true, 255, 4)],
      addressNumber: [``, configureValidator(true)],
      complement: [``, configureValidator(false, 30, 4)],
      postalCode: [``, configureValidator(false, 30, 4)],
      region: [``, configureValidator(true, 255, 4)],
      city: [``, configureValidator(true, 255, 3)],
      state: [``, configureValidator(true, 2, 2)],
      openingHours: [``, configureValidator(true, 5, 5)],
      closingHours: [``, configureValidator(true, 5, 5)],
      workingDays: [``, configureValidator(true, 10, 5)],
    });

    this.formPlace.patchValue({
      name: "Diogo",
      email: "diogo.miranda@outlook.com",
      telephone: "(12) 3204-5660",
      streetName: "Rua Campo Belo",
      addressNumber: 210,
      postalCode: "12233596",
      region: "Bosque dos Eucaliptos",
      city: "Sao Jose dos Campos",
      state: "SP",
      openingHours: "06:00",
      closingHours: "21:00",
      workingDays: "seg às sex"
    });
  }

  onSave(data: PlaceModel) {
    this.placeService.create(data)
      .subscribe((response) => {
        alert(response.title);
        this.navCtrl.navigateBack("/tabs/search-places");
      }, (error) => {
        alert(error);
      });
  }

  onCancel() {
    this.navCtrl.navigateBack("/tabs/home");
  }

}
