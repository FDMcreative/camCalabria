import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChiamateService } from 'src/app/services/chiamate.service';
import { DataService } from 'src/app/services/data.service';

export interface Login {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('f', { static: true }) loginForm: NgForm;
  errorMessage: string;
  login = {} as Login

  constructor(
    private router: Router,
    private chiamateService: ChiamateService,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm) {
    // console.log('loginForm.value: ', loginForm.value);
    this.chiamateService.login(loginForm.value).subscribe(
      res => {
        // console.log('res: ', res);
        if (res.correct) {
          this.dataService.loggedUser = res.utenteLoggato;
          console.log('FROM LOGIN - this.loggedUser: ', this.dataService.loggedUser);

          this.router.navigate(['/comuni']);
        } else {
          this.loginForm.reset();
          this.errorMessage = 'Combinazione Username/Password sbagliata'
        }
      }
    )
  }
}