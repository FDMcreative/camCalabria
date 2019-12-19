import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StagingService } from './staging.service';
import { LoggedUser } from '../models/loggedUser';


@Injectable({
    providedIn: 'root'
})
export class DataService {


    static router: Router;
    // private baseUrl: string = 'http://172.16.8.155:8080';
    private baseUrl: string = 'http://172.16.8.155:8181/sorveglianzacalabria';


    constructor(private httpClient: HttpClient) {
    }



    // -------- METHODS

    /**
     * chiama la il servizio indicato nel param 'method'
     * @param {string} method
     */
    // GET ALL
    protected getAll(method: string): Observable<any> {

        const headers = CrudServiceOptions.getHttpHeaders();
        console.log('GET ALL SENDING this HEADER: ', headers);

        return this.httpClient.get(this.baseUrl + method, { headers }).pipe(
            map(res => {
                console.log('GET ALL: ', res);

                return res;
            }),
            catchError(err => CrudServiceOptions.handleError(throwError(err)))
        );
    }

    // GET ALL
    protected getById(method: string, id: number): Observable<any> {

        const headers = CrudServiceOptions.getHttpHeaders();

        return this.httpClient.get(this.baseUrl + method + id, { headers }).pipe(
            map(res => {
                console.log('GET BY ID: ', res);
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

        const headers = CrudServiceOptions.getHttpHeaders();

        return this.httpClient.post(this.baseUrl + method, model, { headers }).pipe(
            map(res => {
                console.log('POST: ', res);
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
    protected put(method: string, model: any, id: number): Observable<any> {
        return this.httpClient.put(this.baseUrl + method + id, model).pipe(
            map(res => {
                console.log('PUT: ', res);
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

    loggedUser: LoggedUser;

    constructor(private stagingService: StagingService) {
        this.loggedUser = this.stagingService.loggedUser;
    }


    /**
     * costruisce gli header params necessari per le chiamate
     */
    static getHttpHeaders(): HttpHeaders {

        const headers = new HttpHeaders({ 'ruolo': 'admin' });
        headers['loggedUser'] = { 'username': 'admin1' };
        // headers.append('content-type', 'application/json');
        // headers.append('accept', 'application/json');

        return headers;

    }

    static handleError(error: any) {
        console.warn('Error: ', error);

        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return Observable.throw(errMsg);
    }
}