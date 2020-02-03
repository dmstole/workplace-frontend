import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ResponseErrorModel, ResponseSuccessModel } from 'src/app/models/response.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(public toastController: ToastController) { }

    async show(response: ResponseSuccessModel): Promise<boolean> {
        return this.toastPresent(response.title);
    }

    async error(error: ResponseErrorModel): Promise<boolean> {
        const message: string = !error.message
            ? error.toString()
            : error.message;            
        return this.toastPresent(message);
    }

    private async toastPresent(message: string): Promise<boolean> {
        const toast = await this.toastController.create({
            message: message,
            position: 'bottom',
            duration: 2000
        });
        toast.present();

        return Promise.resolve(true);
    }

}