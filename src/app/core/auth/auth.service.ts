import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from "../../../environments/environment";

import { UserService } from '../../services/user.service';

import { LoginModel, RequestResetPasswordModel, ReceivedCodeConfirmationModel, RegisterNewPassword } from '../../models/login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private userService: UserService) { }

    authenticate(loginData: LoginModel) {
        return this.httpClient.post(environment.apiUrl.login, loginData)
            .pipe(
                tap((res: { access_token: any; }) => {
                    const authToken = res.access_token;
                    this.userService.setToken(authToken);
                }));
    }

    requestResetPassword(data: RequestResetPasswordModel) {
        return this.httpClient.post(environment.apiUrl.requestResetPasword, data);
    }

    resetPassword(data: LoginModel) {
        return this.httpClient.post(environment.apiUrl.resetPassword, data);
    }

    receivedCodeConfirmation(data: ReceivedCodeConfirmationModel) {
        return this.httpClient.post(environment.apiUrl.receivedCodeConfirmation, data);
    }

    registerNewPassword(data: RegisterNewPassword) {
        return this.httpClient.post(environment.apiUrl.registerNewPassword, data);
    }
}