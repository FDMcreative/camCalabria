import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-mappa-calabria',
  templateUrl: './mappa-calabria.component.html',
  styleUrls: ['./mappa-calabria.component.scss']
})
export class MappaCalabriaComponent implements OnInit {

  @Output() provinciaEmitter = new EventEmitter();

  constructor() { }



  // LIFECYCLE HOOKS

  ngOnInit() {

  }

  // LIFECYCLE HOOKS END



  // CUSTOM FUNCTIONS

  caricaComuni(provincia: string) {
    // console.log('provincia: ', provincia);
    this.provinciaEmitter.emit(provincia)
  }

  // CUSTOM FUNCTIONS END

}