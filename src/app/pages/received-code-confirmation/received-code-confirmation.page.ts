import { IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from 'src/app/core/message/message.service';
import { ReceivedCodeConfirmationModel } from 'src/app/models/login.model';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';
import { LoaderService } from 'src/app/core/loader/loader.service';

@Component({
  selector: 'app-received-code-confirmation',
  templateUrl: 'received-code-confirmation.page.html',
  styleUrls: ['received-code-confirmation.page.scss']
})
export class ReceivedCodeConfirmationPage implements OnInit {

  @ViewChild("inputCode", null) inputCode: IonInput;

  formReceivedCodeConfirmation: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public loaderService: LoaderService,
    public messageService: MessageService,
  ) { }

  /**
   * ReceivedCodeConfirmation - Iniciate received-code-confirmation page.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  ngOnInit() {
    this.configureFormGroup();
    this.resetForm();

    setTimeout(() => {
      this.inputCode.setFocus();
    }, 1000);
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  /**
   * ReceivedCodeConfirmation - Configure fields with validators
   *
   * @memberof ReceivedCodeConfirmationPage
   * @author Diogo A. Miranda
   */
  configureFormGroup(): void {
    this.formReceivedCodeConfirmation = this.formBuilder.group({
      code: ["", configureValidator(true, 150, 3)],
    });
  }

  /**
   * ReceivedCodeConfirmation - Reset form data
   *
   * @memberof ReceivedCodeConfirmationPage
   * @author Diogo A. Miranda
   */
  resetForm() {
    this.formReceivedCodeConfirmation.reset();
  }

  /**
   * ReceivedCodeConfirmation - Iniciate received-code-confirmation page.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  onConfirmed(data: ReceivedCodeConfirmationModel) {
    this.loaderService.show();
    this.authService.receivedCodeConfirmation(data)
      .pipe(
        debounceTime(2000)
      )
      .subscribe(
        (response: ResponseSuccessModel) => {
          this.messageService.show(response);
          this.loaderService.hide();
          this.redirectNewPassword(data.code);
        },
        (error: ResponseErrorModel) => {
          this.messageService.error(error);
          this.loaderService.hide();
        }
      );
  }

  /**
   * ForgotPassword - Go to login page.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  goLoginPage() {
    this.router.navigate(['/login']);
  }

  redirectNewPassword(code: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        code
      }
    };
    this.router.navigate(['/new-password'], navigationExtras);

  }

}
