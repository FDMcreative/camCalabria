import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ComuneLista } from '../models/comune-lista';
import { LoggedUser } from '../models/loggedUser';


@Injectable({
    providedIn: 'root'
})
export class DataService {



    // ---------- VARIABILI APPOGGIO
    public loggedUser: LoggedUser;
    public selectedComune: ComuneLista;
    // ---------- VARIABILI APPOGGIO END



    static router: Router;
    private baseUrl: string = 'http://172.16.8.155:8080';


    constructor(private httpClient: HttpClient) {
    }



    // -------- METHODS

    /**
     * chiama la il servizio indicato nel param 'method'
     * @param {string} method
     */
    // GET ALL
    protected getAll(method: string): Observable<any> {

        return this.httpClient.get(this.baseUrl + method).pipe(
            map(res => {
                return res;
            }),
            catchError(err => CrudServiceOptions.handleError(throwError(err)))
        );
    }

    /**
     * chiama la il servizio in 'POST' indicato nel param 'method' e passa il 'model' da persistere
     * @param {string} method
     * @param {any} model
     */
    // POST
    protected post(method: string, model: any): Observable<any> {

        return this.httpClient.post(this.baseUrl + method, model).pipe(
            map(res => {
                // console.log('CRUD res save: ', res);
                // let response;
                // response.deserialize(res);
                // return response.output;
                return res;
            }),
            catchError(err => CrudServiceOptions.handleError(throwError(err)))
        );
    }

    /**
     * @param {string} method
     * @param {string} id
     */
    protected put(method: string, model: any, id: string): Observable<any> {
        return this.httpClient.put(method + id, model).pipe(
            map(res => {
                // let response = new Response();
                // response.deserialize(res);
                // return response.output;
                return res;
            }),
            catchError(err => CrudServiceOptions.handleError(throwError(err)))
        );
    }
}


///////
// AUX
///////

export class CrudServiceOptions {

    constructor() { }

    static handleError(error: any) {
        console.warn('Error: ', error);

        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Observable.throw(errMsg);
    }
}