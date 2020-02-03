import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    loaderToShow: any;

    constructor(
        public loadingController: LoadingController,
    ) { }

    show() {
        this.loaderToShow = this.loadingController.create({
            message: 'Carregando...'
        }).then((res) => {
            res.present();
            res.onDidDismiss().then(() => console.log('Loading dismissed!'));
        });
    }

    hide() {
        setTimeout(() => {
            this.loadingController.dismiss();
        }, 500);
    }
    
}