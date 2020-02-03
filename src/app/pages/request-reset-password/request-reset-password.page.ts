import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/core/auth/auth.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { MessageService } from 'src/app/core/message/message.service';
import { RequestResetPasswordModel } from 'src/app/models/login.model';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: 'request-reset-password.page.html',
  styleUrls: ['request-reset-password.page.scss']
})
export class RequestResetPasswordPage implements OnInit {

  @ViewChild("inputEmail", null) inputEmail: IonInput;

  formRequestResetPassword: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public loaderService: LoaderService,
    public messageService: MessageService,
  ) { }

  /**
   * RequestResetPassword - Iniciate request-reset-password page.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  ngOnInit() {
    this.configureFormGroup();
    this.resetForm();

    setTimeout(() => {
      this.inputEmail.setFocus();
    }, 1000);
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  /**
   * RequestResetPassword - Configure fields with validators
   *
   * @memberof RequestResetPasswordPage
   * @author Diogo A. Miranda
   */
  configureFormGroup(): void {
    this.formRequestResetPassword = this.formBuilder.group({
      email: ["", configureValidator(false, 150, 3)],
    });
  }

  /**
   * RequestResetPassword - Reset form data
   *
   * @memberof RequestResetPasswordPage
   * @author Diogo A. Miranda
   */
  resetForm() {
    this.formRequestResetPassword.reset();
  }

  /**
   * RequestResetPassword - Iniciate request-reset-password page.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  onRequest(data: RequestResetPasswordModel) {
    this.loaderService.show();
    this.authService.requestResetPassword(data)
      .subscribe(
        (response: ResponseSuccessModel) => {
          this.messageService.show(response);
          this.redirectToReceivedCodeConfirmation();
          this.loaderService.hide();
        },
        (error: ResponseErrorModel) => {
          this.messageService.error(error);
          this.loaderService.hide();
        });
  }

  /**
   * ForgotPassword - Redirect to received code confirmation.
   *
   * @memberof ForgotPasswordPage
   * @author Diogo A. Miranda
   */
  redirectToReceivedCodeConfirmation() {
    this.router.navigate(['/received-code-confirmation']);
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

}
