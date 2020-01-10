import { Component, OnInit, ViewChild } from '@angular/core';
import { ChiamateService } from 'src/app/services/chiamate.service';
import { ComuneDettaglio } from 'src/app/models/comune-dettaglio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StagingService } from 'src/app/services/staging.service';
import { LoggedUser } from 'src/app/models/loggedUser';
import { ResidenzaDisabili } from 'src/app/models/residenza-disabili';
import { ResidenzaAnziani } from 'src/app/models/residenza-anziani';
import { Asilo } from 'src/app/models/asilo';
import { FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-comune',
  templateUrl: './comune.component.html',
  styleUrls: ['./comune.component.scss']
})
export class ComuneComponent implements OnInit {

  @ViewChild('residenzaDisabiliAppoggioNome', { static: true }) residenzaDisabiliAppoggioNome;
  @ViewChild('addRowFormAsili', { static: true }) addRowFormAsili: NgForm;
  @ViewChild('addRowFormAnziani', { static: true }) addRowFormAnziani: NgForm;
  @ViewChild('addRowFormDisabili', { static: true }) addRowFormDisabili: NgForm;

  loggedUser: LoggedUser;
  allowEdit: boolean;
  comune: ComuneDettaglio;
  asiloNidoAppoggio: Asilo;
  residenzaAnzianiAppoggio: ResidenzaAnziani;
  residenzaDisabiliAppoggio: ResidenzaDisabili;
  idComune: number;

  constructor(
    private chiamateService: ChiamateService,
    private route: ActivatedRoute,
    private router: Router,
    private stagingService: StagingService) {

  }

  ngOnInit() {

    // Check Admin or Guest
    this.loggedUser = this.stagingService.loadLoggedUser();
    this.allowEdit = true ? this.loggedUser.ruolo.tipo == 'admin' : false;

    // Initialize Variabili Appoggio
    if (this.allowEdit) {
      this.asiloNidoAppoggio = new Asilo(null, null, null, null, null);
      this.residenzaAnzianiAppoggio = new ResidenzaAnziani(null, null, null, null, null);
      this.residenzaDisabiliAppoggio = new ResidenzaDisabili(null, null, null, null, null);
    }

    this.idComune = +this.route.snapshot.params['id'];

    this.route.params
      .subscribe(
        (params: Params) => {
          this.idComune = params['id'];
          this.chiamateService.getComuneById(this.idComune)
            .subscribe((data: ComuneDettaglio) => {
              // console.log('data: ', data);
              this.comune = data;
            });
        }
      );
  }

  onSubmit(f) {
    console.log('COMUNE: ', this.comune);

    this.chiamateService.modifyComune(this.comune, this.idComune)
      .subscribe((data) => {
        // console.log('Comune Modificato: ', data);
        this.router.navigate(['/comuni']);
      });
  }

  onDeleteRow(array: [], i: number) {
    array.splice(i, 1);
    console.log('onDeleteRow: ', array);
  }

  onAddAsiloNido() {
    this.comune.asiliNido.push(this.asiloNidoAppoggio);
    this.asiloNidoAppoggio = new Asilo(null, null, null, null, null);
    this.addRowFormAsili.reset();
  }
  onAddResidenzaAnziani() {
    this.comune.residenzeAnziani.push(this.residenzaAnzianiAppoggio);
    this.residenzaAnzianiAppoggio = new ResidenzaAnziani(null, null, null, null, null);
    this.addRowFormAnziani.reset();
  }
  onAddResidenzaDisabili() {
    this.comune.residenzeDisabili.push(this.residenzaDisabiliAppoggio);
    this.residenzaDisabiliAppoggio = new ResidenzaDisabili(null, null, null, null, null);
    this.addRowFormDisabili.reset();
  }

}
