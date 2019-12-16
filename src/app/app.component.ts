import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { LoggedUser } from './models/loggedUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'camCalabria';
  loggedUser: LoggedUser;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.loggedUser = this.dataService.loggedUser;
    // console.log('FROM APP - this.loggedUser : ', this.loggedUser);
  }

}
