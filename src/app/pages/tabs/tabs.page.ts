import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public router: Router,
    public userService: UserService
  ) {
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.userService.logout();
  }

}
