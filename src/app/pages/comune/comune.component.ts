import { Component, OnInit } from '@angular/core';
import { ComuneLista } from 'src/app/models/comune-lista';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-comune',
  templateUrl: './comune.component.html',
  styleUrls: ['./comune.component.scss']
})
export class ComuneComponent implements OnInit {

  comune: ComuneLista;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.comune = this.dataService.selectedComune;
  }

}
