import { Injectable } from '@angular/core';
import * as jtw_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

import { TokenService } from './token.service';

import { UserModel } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  

    private userSubject = new BehaviorSubject<UserModel>(null);
    private userName: string;

    public user: UserModel;

    constructor(
        private httpClient: HttpClient,
        private navCtrl: NavController,
        private tokenService: TokenService,
    ) {
        // tslint:disable-next-line: no-unused-expression
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    create(data: UserModel): Observable<any> {
        return this.httpClient.post<UserModel>(environment.apiUrl.users, data);
    }

    getUser() {
        return this.user;
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as UserModel;

        this.userName = user.name;
        this.user = user;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
        this.navCtrl.navigateForward("/login");
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}
