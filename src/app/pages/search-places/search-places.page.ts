import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PlaceService } from 'src/app/services/place.service';
import { configureValidator } from 'src/app/core/validator/custom.validator';

@Component({
    selector: 'app-search-places',
    templateUrl: 'search-places.page.html',
    styleUrls: ['search-places.page.scss']
})
export class SearchPlacesPage implements OnInit {

    loading = false;
    formSearchPlace: FormGroup;

    constructor(
        public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public placeService: PlaceService) { }

    ngOnInit() {
        this.placeService.load();
        this.configureFormGroup();
    }

    onSearch(data: SearchPlaceModel) {

        this.placeService.search(data);
        this.formSearchPlace.patchValue({
            keyWord: "",
        });
        this.navCtrl.navigateForward("/tabs/home");
    }

    /**
     * Search Place - Configure fields with validators
     *
     * @memberof SearchPlacePage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formSearchPlace = this.formBuilder.group({
            keyWord: ['', configureValidator(true, 150, 3)],
        });
    }
}

export interface SearchPlaceModel {
    keyWord: string;
}