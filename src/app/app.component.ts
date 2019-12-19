import { Component, OnInit } from '@angular/core';
import { LoggedUser } from './models/loggedUser';
import { StagingService } from './services/staging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'camCalabria';
  loggedUser: LoggedUser;

  constructor(
    public stagingService: StagingService) { }

  ngOnInit() {
    this.loggedUser = this.stagingService.loggedUser;
    console.log('FROM APP - this.loggedUser : ', this.loggedUser);
  }

}
