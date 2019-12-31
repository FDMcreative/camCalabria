import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { ChiamateService } from 'src/app/services/chiamate.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComuneLista } from 'src/app/models/comune-lista';
import { StagingService } from 'src/app/services/staging.service';

//  * @title Table with selection
@Component({
  selector: 'app-comuni',
  templateUrl: './comuni.component.html',
  styleUrls: ['./comuni.component.scss']
})
export class ComuniComponent implements OnInit, AfterViewInit, OnChanges {



  // ---------------------- TABLE
  @ViewChild('table', { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  // displayedColumns: string[] = ['select', 'id', 'name', 'file', 'action'];
  citiesTable: ComuneLista[] = [];
  displayedColumns: string[] = ['stemma', 'nome', 'provincia', 'asiliNido', 'residenzeAnziani', 'residenzeDisabili', 'file', 'action'];
  dataSource = new MatTableDataSource<ComuneLista>(this.citiesTable);
  // ---------------------- TABLE END


  allowEdit: boolean;
  selectedProvincia: string;
  allCities: ComuneLista[] = [];
  allCitiesArray: string[] = [];
  cityAppoggio: FormControl;
  cercaAppoggio: string;
  filteredCitiesOptions: Observable<string[]>;


  constructor(
    private chiamateService: ChiamateService,
    private stagingService: StagingService) {
    this.cityAppoggio = new FormControl(null, [Validators.required]);
  }



  // --------------------- LIFECYCLES HOOKS

  // ngOnInit
  ngOnInit() {

    // Check Admin or Guest
    if (this.stagingService.loggedUser) {
      this.allowEdit = true ? this.stagingService.loggedUser.ruolo.tipo == 'admin' : false;
    }

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.getComuni();
  }

  // ngAfterViewInit
  ngAfterViewInit() {
    this.updateTable();
  }

  ngOnChanges() {
    console.warn('selectedProvincia: ', this.selectedProvincia);
  }

  // --------------------- LIFECYCLES HOOKS END



  // --------------------- CUSTOM FUNCTIONS

  // Autocomplete
  autocompleteFunction() {
    this.filteredCitiesOptions = this.cityAppoggio.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCitiesArray.filter(option => option && option.toLowerCase().includes(filterValue));
  }

  // Get All Comuni
  getComuni() {
    this.chiamateService.getAllComuni()
      .subscribe((data: ComuneLista[]) => {
        this.allCities = data;
        // console.log('this.allCities: ', this.allCities);
        // Transform To Array of Strings
        // this.allCitiesArray = this.allCities.map((city: ComuneLista) => city.nome.replace(city.nome[0], city.nome[0].toUpperCase()));
        this.allCitiesArray = this.allCities.map((city: ComuneLista) => city.nome);
        console.log('this.allCitiesArray: ', this.allCitiesArray);
        // Populate the Autocomplete
        this.autocompleteFunction();
      });
  }

  // Update Table
  updateTable() {
    this.dataSource.data = this.citiesTable;
    // this.table.renderRows();
  };

  // Function to Erase Duplicates in Arrays Concat
  arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
      for (var j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j])
          a.splice(j--, 1);
      }
    }
    return a;
  }

  // Add a City
  onAddCity() {
    // console.log('this.cityAppoggio.value: ', this.cityAppoggio.value);
    let result = this.allCities.filter(obj => obj && obj.nome === this.cityAppoggio.value);
    // this.citiesTable = this.arrayUnique(this.citiesTable.concat(result));
    this.citiesTable = this.arrayUnique(result.concat(this.citiesTable));
    // console.log('AFTER citiesTable: ', this.citiesTable);

    this.updateTable();

    // // Reset City FormControl
    this.cityAppoggio.reset('');
  }

  // Add All Cities to Table
  addAllCities() {
    this.citiesTable = this.allCities;
    this.updateTable();
  }

  // Remove All Cities from Table
  removeAllCities() {
    this.citiesTable = [];
    this.updateTable();
  }

  // Select a Provincia
  selectProvincia(provincia) {
    this.selectedProvincia = provincia;
    // console.log('PROVINCIA: ', provincia);
    this.removeAllCities();
    this.citiesTable = this.allCities.filter(city => city.provincia && city.provincia.toLowerCase() == provincia);
    console.log('this.citiesTable: ', this.citiesTable);
    this.updateTable();
  }

  // Search Generico
  onSearch(cerca) {
    console.log('cerca: ', cerca);
  }

  // Check if fileUpload has been populated
  checkFileUpload() {
    let button = (<HTMLInputElement>document.getElementById("fileUpload"));
    if (button.value != "") {
      console.log("YOU HAVE A FILE");
      button.innerHTML = 'BRAVO'
    }
  }

  // --------------------- CUSTOM FUNCTIONS END



  // ---------------------- CHECKBOXES

  // selection = new SelectionModel<string>(true, []);

  // /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  // /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: string): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  // }

  // ---------------------- CHECKBOXES END

}

