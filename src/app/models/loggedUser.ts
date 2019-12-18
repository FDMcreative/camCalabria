export interface LoggedUser {
    username: string;
    ruolo: {
        idRuolo: number;
        tipo: string;
    };
}