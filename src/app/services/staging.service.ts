import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { ComuneLista } from '../models/comune-lista';

@Injectable({
    providedIn: 'root'
})
export class StagingService {



    // ---------- VARIABILI APPOGGIO
    public loggedUser: LoggedUser;
    public selectedComune: ComuneLista;
    // ---------- VARIABILI APPOGGIO END




}