import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { LoginModel } from "src/app/models/login.model";
import { AuthService } from "src/app/core/auth/auth.service";
import { LoaderService } from "src/app/core/loader/loader.service";
import { ResponseErrorModel } from 'src/app/models/response.model';
import { MessageService } from "src/app/core/message/message.service";
import { configureValidator } from "src/app/core/validator/custom.validator";

@Component({
    selector: "app-login",
    templateUrl: "login.html",
    styleUrls: ["login.page.scss"]
})
export class LoginPage implements OnInit {

    login: LoginModel;
    formLogin: FormGroup;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private loaderService: LoaderService,
        private messageService: MessageService,
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

    ionViewDidEnter() {
        this.ngOnInit();
    }

    /**
     * Login - Configure fields with validators
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    configureFormGroup(): void {
        this.formLogin = this.formBuilder.group({
            email: ["", configureValidator(true, 150, 4)],
            password: ["", configureValidator(true, 6, 6)]
        });

        this.formLogin.patchValue({
            email: "diogo.miranda@outlook.com",
            password: "485100"
        });
    }

    /**
     * Login - When authenticated then redirect to home else show modal invalid login
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    public onAuthenticated(data: { email: string, password: string }): void {
        this.loaderService.show();
        this.authService.authenticate(data)
            .subscribe(() => {
                this.loaderService.hide();
                this.router.navigate(["/tabs"]);
            }, (error: ResponseErrorModel) => {
                this.loaderService.hide();
                this.messageService.error(error);
            });

        this.formLogin.reset();
    }

    /**
     * Login - Go new user page
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    goNewUserPage() {
        this.router.navigate(["/new-user"]);
    }

    /**
     * Login - Go request reset password page
     *
     * @memberof LoginPage
     * @author Diogo A. Miranda
     */
    goRequestResetPassword() {
        this.router.navigate(["/request-reset-password"]);
    }

}
