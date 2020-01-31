import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { configureValidator } from 'src/app/core/validator/custom.validator';
import { DepartamentService } from 'src/app/services/departament.service';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/room.sevice';
import { TableService } from 'src/app/services/table.service';

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

    selectAllPositions = false;

    constructor(
        private route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public departamentService: DepartamentService,
        public roomService: RoomService,
        public tableService: TableService,
    ) {

    }

    ngOnInit() {
        this.configureFormGroup();
        this.loadDepartaments();
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
            totalPositions: ['', configureValidator(true)]
        });

        this.formSchedule.patchValue({
            departament: "",
            room: "",
            table: "",
        });
    }

    loadDepartaments() {
        this.route.queryParams.subscribe(params => {
            if (params && params.place) {
                const placeId: number = params.place;
                this.departamentService.load(placeId);
                this.departaments$ = this.departamentService.departamentSubject.asObservable();
            }
        });
    }

    loadRooms() {
        const departamentId = this.formSchedule.get("departament").value;
        this.roomService.load(departamentId);
        this.rooms$ = this.roomService.roomSubject.asObservable();
        this.roomDisable$ = this.roomService.disableSubject.asObservable();
    }

    loadTables() {
        const roomId = this.formSchedule.get("room").value;
        console.log(roomId);
        this.tableService.load(roomId);
        this.tables$ = this.tableService.tableSubject.asObservable();
        this.tableDisable$ = this.tableService.disableSubject.asObservable();
    }

    search() {

    }
}