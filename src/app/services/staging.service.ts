import { Injectable, Output, EventEmitter } from '@angular/core';
import { LoggedUser } from '../models/loggedUser';
import { ComuneLista } from '../models/comune-lista';

@Injectable({
    providedIn: 'root'
})
export class StagingService {


    @Output() userChanged = new EventEmitter();

    sendData(arg: any) {
        this.userChanged.emit(arg);
    }



    // ---------- VARIABILI APPOGGIO
    private loggedUser;
    public selectedComune: ComuneLista;
    // ---------- VARIABILI APPOGGIO END


    // SAVE IN SESSION STORAGE
    private storeLoggedUser(user: LoggedUser) {
        sessionStorage.setItem('loggedUser', JSON.stringify(user));
    }

    private retrieveLoggedUser() {
        let storedLoggedUser: string = sessionStorage.getItem('loggedUser');
        if (!storedLoggedUser) throw 'no logged user found';
        return storedLoggedUser;
    }

    private removeLoggedUser() {
        sessionStorage.removeItem('loggedUser');
    }

    public saveLoggedUser(user: LoggedUser) {
        this.loggedUser = user;
        this.storeLoggedUser(this.loggedUser);
        this.userChanged.emit(user);
    }

    public loadLoggedUser() {
        let user: LoggedUser;
        try {
            let storedLoggedUser = JSON.parse(this.retrieveLoggedUser());
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


}