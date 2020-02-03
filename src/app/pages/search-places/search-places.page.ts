import { Router } from "@angular/router";
import { IonInput } from "@ionic/angular";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, ViewChild, OnInit } from "@angular/core";

import { PlaceService } from "src/app/services/place.service";
import { LoaderService } from "src/app/core/loader/loader.service";
import { configureValidator } from "src/app/core/validator/custom.validator";

@Component({
    selector: "app-search-places",
    templateUrl: "search-places.page.html",
    styleUrls: ["search-places.page.scss"]
})
export class SearchPlacesPage implements OnInit {

    @ViewChild("inputKeyWord", null) inputKeyWord: IonInput;

    loading = false;
    formSearchPlace: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private loaderService: LoaderService,
        private placeService: PlaceService) { }

    ngOnInit() {
        this.configureFormGroup();

        setTimeout(() => this.inputKeyWord.setFocus(), 700);
    }

    ionViewDidEnter() {
        this.ngOnInit();
    }

    /**
     * Search Place - Configure fields with validators
     *
     * @memberof SearchPlacePage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formSearchPlace = this.formBuilder.group({
            keyWord: ["", configureValidator(false, 150, 3)],
        });
    }

    /**
     * Search Place - Search places using some keyWord.
     *
     * @memberof SearchPlacePage
     * @author Diogo A. Miranda
     */
    onSearch(data: SearchPlaceModel) {
        this.loaderService.show();
        this.placeService.search(data);
        this.formSearchPlace.reset();
        this.loaderService.hide();
        this.router.navigate(["/tabs/home"]);
    }
}

export interface SearchPlaceModel {
    keyWord: string;
}