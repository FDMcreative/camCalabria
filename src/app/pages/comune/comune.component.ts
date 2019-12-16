import { Component, OnInit } from '@angular/core';
import { ComuneLista } from 'src/app/models/comune-lista';
import { DataService } from 'src/app/services/data.service';
import { ChiamateService } from 'src/app/services/chiamate.service';


@Component({
  selector: 'app-comune',
  templateUrl: './comune.component.html',
  styleUrls: ['./comune.component.scss']
})
export class ComuneComponent implements OnInit {

  comune: any;

  constructor(private dataService: DataService, private chiamateService: ChiamateService) { }

  ngOnInit() {
    // this.comune = this.dataService.selectedComune;
    console.log('COMUNE DETT');

    this.chiamateService.getComuneById(1)
      .subscribe((data: []) => {
        console.log('data: ', data);
        this.comune = data;
      });
  }

  onSubmit() {

  }

}
