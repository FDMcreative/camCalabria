// export class Asilo {

//     constructor(
//         public idAsilo: number,
//         public nome: string,
//         public indirizzo: string,
//         public telefono: number,
//         public numeroStanze: number
//     ) { }

// }

export class Asilo {
    public idAsilo: string;
    public nome: string;
    public indirizzo: string;
    public telefono: number;
    public numeroStanze: number;

    constructor(idAsilo: string, nome: string, indirizzo: string, telefono: number, numeroStanze: number) {
        this.idAsilo = idAsilo;
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.numeroStanze = numeroStanze;
    }
}