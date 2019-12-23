import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  admin: boolean = false;
  nascondi: boolean = false;
  
  constructor() {
    if(localStorage.getItem("token")){
      this.nascondi=true;
    }
    if(localStorage.getItem("authorization") == "ADMIN"){
      this.admin = true;
    }

   }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    //window.location.reload();
    this.nascondi = false;
    this.admin = false;
  }
}
