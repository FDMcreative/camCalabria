export interface LoggedUser {
    username: string;
    idComune: number;
    ruolo: {
        idRuolo: number;
        tipo: string;
    };
}