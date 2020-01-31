import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { configureValidator, ValidatorPattern } from 'src/app/core/validator/custom.validator';

@Component({
    selector: 'app-login',
    templateUrl: "login.html",
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

    formLogin: FormGroup;
    login: LoginModel;

    constructor(
        private formBuilder: FormBuilder,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController,
        // private viewCtrl: ViewController,
        private authService: AuthService,
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
     * Login - When authenticated then redirect to home else show modal invalid login
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    public onAuthenticated(data: { email: string, password: string }): void {
        this.authService.authenticate(data)
            .subscribe(() => {
                this.navCtrl.navigateForward("/tabs");
            }, (error) => {
                console.info(typeof error);
                alert(error);
            });
    }

    /**
     * Login - Configure fields with validators
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formLogin = this.formBuilder.group({
            email: ['', configureValidator(true, 150, 4)],
            password: ['', configureValidator(true, 6, 6)]
        });

        this.formLogin.patchValue({
            email: "diogo.miranda@outlook.com",
            password: "485100"
        });
    }

    onCreate() {
        this.navCtrl.navigateForward("/new-user");
    }
}
