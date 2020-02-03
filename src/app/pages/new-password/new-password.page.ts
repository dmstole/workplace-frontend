import { IonInput } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from 'src/app/core/auth/auth.service';
import { RegisterNewPassword } from 'src/app/models/login.model';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { MessageService } from 'src/app/core/message/message.service';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-new-password',
  templateUrl: 'new-password.page.html',
  styleUrls: ['new-password.page.scss']
})
export class NewPasswordPage implements OnInit {

  @ViewChild("inputPassword", null) inputPassword: IonInput;

  formNewPassword: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public loaderService: LoaderService,
    public messageService: MessageService,
  ) { }

  /**
   * NewPasswordPage - Iniciate new-password page.
   *
   * @memberof NewPasswordPage
   * @author Diogo A. Miranda
   */
  ngOnInit() {
    this.configureFormGroup();
    this.resetForm();

    setTimeout(() => this.inputPassword.setFocus(), 1000);
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  /**
   * NewPasswordPage - Configure fields with validators
   *
   * @memberof NewPasswordPage
   * @author Diogo A. Miranda
   */
  configureFormGroup(): void {
    this.formNewPassword = this.formBuilder.group({
      password: ["", configureValidator(true, 6, 6)],
      confirmPassword: ["", configureValidator(true, 6, 6)],
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  /**
   * NewPasswordPage - Reset form data
   *
   * @memberof NewPasswordPage
   * @author Diogo A. Miranda
   */
  resetForm() {
    this.formNewPassword.reset();
  }

  /**
   * NewPasswordPage - Iniciate new-password page.
   *
   * @memberof NewPasswordPage
   * @author Diogo A. Miranda
   */
  onUpdate(data: RegisterNewPassword) {
    this.loaderService.show();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.code) {
        const code: string = params.code;
        data.code = code;
        this.authService.registerNewPassword(data)
          .pipe(
            debounceTime(2000)
          )
          .subscribe(
            (response: ResponseSuccessModel) => {
              this.messageService.show(response);
              this.loaderService.hide();
            },
            (error: ResponseErrorModel) => {
              this.messageService.error(error);
              this.loaderService.hide();
            }
          );
      }
    });
  }

  /**
   * NewPasswordPage - Go to login page.
   *
   * @memberof NewPasswordPage
   * @author Diogo A. Miranda
   */
  goLoginPage() {
    this.router.navigate(['/login']);
  }

}
