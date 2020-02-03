import { IonInput, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';

import { TableModel } from 'src/app/models/table.model';
import { RoomService } from 'src/app/services/room.sevice';
import { WorkPositionModel } from 'src/app/models/schedule.model';
import { TableService } from 'src/app/services/table.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { MessageService } from 'src/app/core/message/message.service';
import { DepartamentService } from 'src/app/services/departament.service';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { HomePage } from '../home/home.page';

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.page.html',
    styleUrls: ['schedule.page.scss']
})
export class SchedulePage implements OnInit {

    formSchedule: FormGroup;

    departaments$: Observable<any>;
    rooms$: Observable<any>;
    tables$: Observable<any>;

    roomDisable$: Observable<boolean>;
    tableDisable$: Observable<boolean>;

    selectedWorkTotalPosition = false;
    totalWorkPositionsFromTableSelected = 0;

    constructor(
        public router: Router,
        public formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public navCtrl: NavController,
        public roomService: RoomService,
        public tableService: TableService,
        public loaderService: LoaderService,
        public messageService: MessageService,
        public departamentService: DepartamentService,
        public scheduleWorkPositionService: ReservationService
    ) { }

    ngOnInit() {
        this.configureFormGroup();
        this.loadDepartaments();
    }

    ionViewDidEnter() {
        this.resetForm();
    }


    /**
     * Schedule - Configure fields with validators
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formSchedule = this.formBuilder.group({
            departament: ['', configureValidator(true)],
            room: ['', configureValidator(true)],
            table: ['', configureValidator(true)],
            totalWorkPositions: ['', configureValidator(true)],
            startDate: ['', configureValidator(true)],
            endDate: ['', configureValidator(true)],
        });
    }

    /**
     * Schedule - Reset data form
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    resetForm() {
        this.formSchedule.reset();
    }

    /**
     * Schedule - Load list of departaments
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    loadDepartaments() {
        this.departaments$ = this.departamentService.departamentSubject.asObservable();
    }

    /**
     * Schedule - Load list of rooms
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    loadRooms() {
        const departamentId = this.formSchedule.get("departament").value;
        this.roomService.load(departamentId);
        this.rooms$ = this.roomService.roomSubject.asObservable();
        this.roomDisable$ = this.roomService.disableSubject.asObservable();
    }

    /**
     * Schedule - Load list of tables
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    loadTables() {
        const roomId = this.formSchedule.get("room").value;
        this.tableService.load(roomId);
        this.tables$ = this.tableService.tableSubject.asObservable();
        this.tableDisable$ = this.tableService.disableSubject.asObservable();
    }

    /**
     * Schedule - Reserve work position to company user
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    reserve(data: WorkPositionModel) {
        this.loaderService.show();
        this.activatedRoute.queryParams.subscribe(params => {
            if (params && params.place) {
                const place: any = params.place;
                data.place = place;
                this.scheduleWorkPositionService.reserve(data)
                    .subscribe(
                        (response: ResponseSuccessModel) => {
                            this.resetForm();
                            this.messageService.show(response);
                            this.loaderService.hide();
                            this.goHomePage();
                        },
                        (error: ResponseErrorModel) => {
                            this.messageService.error(error);
                            this.loaderService.hide();
                        });
            }
        });

        this.formSchedule.reset();
    }

    /**
     * Schedule - Go to home page
     *
     * @memberof SchedulePage
     * @author Diogo A. Miranda
     */
    goHomePage() {
        this.router.navigate(["/tabs/home"]);
    }

}