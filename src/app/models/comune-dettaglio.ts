import { Asilo } from './asilo';
import { ResidenzaAnziani } from './residenza-anziani';
import { ResidenzaDisabili } from './residenza-disabili';

export interface ComuneDettaglio {
    idComune: number;
    nome: string;
    provincia: string;
    asiliNido: Asilo[];
    residenzeAnziani: ResidenzaAnziani[];
    residenzeDisabili: ResidenzaDisabili[];
}
