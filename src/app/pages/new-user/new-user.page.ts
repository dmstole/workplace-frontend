import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/core/auth/auth.service';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-new-user',
    templateUrl: "new-user.html",
    styleUrls: ['new-user.page.scss']
})
export class NewUserPage implements OnInit {

    formNewUser: FormGroup;
    user: UserModel;

    constructor(
        private formBuilder: FormBuilder,
        private navCtrl: NavController,
        private userService: UserService,
    ) { }

    /**
     * Login - Iniciate login page.
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    ngOnInit(): void {
        this.configureFormGroup();
    }

    /**
     * Login - Configure fields with validators
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formNewUser = this.formBuilder.group({
            type: ['Profissional', configureValidator(true)],
            name: ['', configureValidator(true, 150, 4)],
            document: ['', configureValidator(true, 30, 4)],
            email: ['', configureValidator(true, 150, 4)],
            password: ['', configureValidator(true, 6, 6)],
            confirmPassword: ['', configureValidator(true, 6, 6)],
            streetName: ['', configureValidator(true, 200, 4)],
            addressNumber: ['', configureValidator(true)],
            complement: ['', configureValidator(false, 20, 4)],
            postalCode: ['', configureValidator(true, 12, 8)],
            region: ['', configureValidator(true, 150, 4)],
            city: ['', configureValidator(true, 150, 4)],
            state: ['', configureValidator(true, 2, 2)],
        });

        this.formNewUser.patchValue({
            name: "Diogo",
            email: "diogo.miranda@outlook.com",
            document: "21592932886",
            password: "485100",
            confirmPassword: "485100",
            streetName: "Rua Campo Belo",
            addressNumber: 210,
            postalCode: "12233596",
            region: "Bosque dos Eucaliptos",
            city: "Sao Jose dos Campos",
            state: "SP"
        });
    }

    onSave(data: UserModel) {
        this.userService.create(data)
            .subscribe((response) => {
                alert(response.title);
                this.goLoginPage();
            }, (error) => {
                alert(error);
            });
    }

    goLoginPage() {
        this.navCtrl.navigateForward("/login");
    }
}
