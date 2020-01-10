import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/models/loggedUser';
import { StagingService } from 'src/app/services/staging.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'camCalabria';
  loggedUser: LoggedUser;

  constructor(
    private stagingService: StagingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {

    this.loggedUser = this.stagingService.loadLoggedUser();

    this.stagingService.userChanged
      .subscribe((user) => {
        this.loggedUser = user;
        console.log('FROM HEADER - this.loggedUser : ', this.loggedUser);
      });
  }

  logout() {
    this.stagingService.logoutUser();
    this.router.navigate(['/login']);
  }

}
