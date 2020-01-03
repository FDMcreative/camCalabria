import { Injectable, Output, EventEmitter } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { ComuneLista } from '../models/comune-lista';

@Injectable({
    providedIn: 'root'
})
export class StagingService {

    @Output() userChanged = new EventEmitter();

    // --- VARIABILI APPOGGIO
    private loggedUser;
    public selectedComune: ComuneLista;
    // --- VARIABILI APPOGGIO END


    // GENERIC SAVE IN SESSION STORAGE
    private storeLoggedUser(key: string, user: LoggedUser) {
        sessionStorage.setItem(key, JSON.stringify(user));
    }

    // GENERIC RETRIEVE FROM SESSION STORAGE
    private retrieveLoggedUser(key: string) {
        let storedLoggedUser: string = sessionStorage.getItem(key);
        if (!storedLoggedUser) throw 'no logged user found';
        return storedLoggedUser;
    }


    // --- USER METHODS

    public saveLoggedUser(user: LoggedUser) {
        this.loggedUser = user;
        this.storeLoggedUser('loggedUser', this.loggedUser);
        this.userChanged.emit(user);
    }

    public loadLoggedUser() {
        let user: LoggedUser;
        try {
            let storedLoggedUser = JSON.parse(this.retrieveLoggedUser('loggedUser'));
            user = storedLoggedUser;
            console.log('storedLoggedUser', storedLoggedUser);
        }
        catch (err) {
            console.error(err);
        }
        return user;
    }

    public logoutUser() {
        this.removeLoggedUser();
    }
    private removeLoggedUser() {
        sessionStorage.removeItem('loggedUser');
    }

    // --- USER METHODS END

}