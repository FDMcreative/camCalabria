import { Component, OnInit } from '@angular/core';
import { ChiamateService } from 'src/app/services/chiamate.service';
import { ComuneDettaglio } from 'src/app/models/comune-dettaglio';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-comune',
  templateUrl: './comune.component.html',
  styleUrls: ['./comune.component.scss']
})
export class ComuneComponent implements OnInit {

  allowEdit: boolean;
  comune: ComuneDettaglio;
  id: number;
  constructor(
    private dataService: DataService,
    private chiamateService: ChiamateService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {

    // Check Admin or Guest
    if (this.dataService.loggedUser) {
      this.allowEdit = true ? this.dataService.loggedUser.ruolo.tipo == 'admin' : false;
    }

    this.id = +this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          this.chiamateService.getComuneById(this.id)
            .subscribe((data: ComuneDettaglio) => {
              // console.log('data: ', data);
              this.comune = data;
            });
        }
      );
  }

  onSubmit() {
    console.log('COMUNE: ', this.comune);

    this.chiamateService.modifyComune(this.comune, this.id)
      .subscribe((data) => {
        // console.log('Comune Modificato: ', data);
        this.router.navigate(['/comuni']);
      });
  }

}
