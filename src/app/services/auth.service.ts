import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ruolo:string;
  private _loginUrl = "http://localhost:8080/api/autenticazione/accesso";

  constructor(private http: HttpClient,
              private _router: Router) { }



  loginUser(user): Observable<any> {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')  
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}