import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChiamateService extends DataService {

    // GETs
    getAllComuni(): Observable<any> {
        return this.getAll('/comuni');
    }
    getComuneById(id: number): Observable<any> {
        return this.getById('/comuni/', id);
    }

    // POSTs
    login(data): Observable<any> {
        return this.post('/utente/login', data);
    }

    // PUTs
    modifyComune(comune: any, id: number): Observable<any> {
        // commentato solo per Local Mock
        // return this.save('/enti/' + id, ente);
        return this.put('/comuni/', comune, id);
    }

}