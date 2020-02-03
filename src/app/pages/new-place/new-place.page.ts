import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PlaceModel } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { MessageService } from 'src/app/core/message/message.service';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';
import { configureValidator, ValidatorPattern } from 'src/app/core/validator/custom.validator';

@Component({
  selector: 'app-new-place',
  templateUrl: 'new-place.page.html',
  styleUrls: ['new-place.page.scss']
})
export class NewPlacePage implements OnInit {

  public formPlace: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public placeService: PlaceService,
    public loaderService: LoaderService,
    public messageService: MessageService,
  ) { }

  ngOnInit() {
    this.configureForm();
  }

  ionViewDidEnter() {
    this.ngOnInit();
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
    this.loaderService.show();
    this.placeService.create(data)
      .subscribe((response: ResponseSuccessModel) => {
        this.loaderService.hide();
        this.messageService.show(response)
        this.router.navigate(["/tabs/search-places"]);
      }, (error: ResponseErrorModel) => {
        this.messageService.error(error);
      });
    this.formPlace.reset();
  }

  goToHomePage() {
    this.router.navigate(["/tabs/home"]);
  }

}
