import { Component, OnInit } from '@angular/core';
import { ChiamateService } from 'src/app/services/chiamate.service';
import { ComuneDettaglio } from 'src/app/models/comune-dettaglio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StagingService } from 'src/app/services/staging.service';
import { LoggedUser } from 'src/app/models/loggedUser';


@Component({
  selector: 'app-comune',
  templateUrl: './comune.component.html',
  styleUrls: ['./comune.component.scss']
})
export class ComuneComponent implements OnInit {

  loggedUser: LoggedUser;
  allowEdit: boolean;
  comune: ComuneDettaglio;
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

}
