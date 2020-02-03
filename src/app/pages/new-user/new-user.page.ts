import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/core/message/message.service';
import { configureValidator } from 'src/app/core/validator/custom.validator';
import { ResponseSuccessModel, ResponseErrorModel } from 'src/app/models/response.model';

@Component({
  selector: 'app-new-user',
  templateUrl: "new-user.html",
  styleUrls: ['new-user.page.scss']
})
export class NewUserPage implements OnInit {

  user: UserModel;
  formNewUser: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
  ) { }

  /**
   * NewUser - Iniciate new user page.
   *
   * @memberof NewUserPage
   * @author Diogo A. Miranda
   */
  ngOnInit(): void {
    this.configureFormGroup();
  }

  ionViewDidEnter() {
    this.ngOnInit();
  }

  /**
   * NewUser - Configure fields with validators
   *
   * @memberof NewUserPage
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

  /**
   * NewUser - Save new user data form
   *
   * @memberof NewUserPage
   * @author Diogo A. Miranda
   */
  onSave(data: UserModel) {
    this.userService.create(data)
      .subscribe(
        async (response: ResponseSuccessModel) => {
          await this.messageService.show(response);
          this.goLoginPage();
        },
        async (error: ResponseErrorModel) => {
          await this.messageService.error(error);
        });
    this.formNewUser.reset();
  }

  /**
   * NewUser - Go to login page
   *
   * @memberof NewUserPage
   * @author Diogo A. Miranda
   */
  goLoginPage() {
    this.router.navigate(["/login"]);
  }

}
