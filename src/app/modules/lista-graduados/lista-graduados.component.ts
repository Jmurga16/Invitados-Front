
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-graduados',
  templateUrl: './lista-graduados.component.html',
  styleUrls: ['./lista-graduados.component.scss']
})
export class ListaGraduadosComponent implements OnInit {


  //#region Variables
  txtFiltro = new FormControl();
  sTitulo: string = "";
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'sDNI',
    'sNombrePersona'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //#endregion

  constructor(
    private router: Router,
    private personaService: PersonaService
  ) {

    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.fnListTable()
  }

  //#region Filtrado de Clientes
  applyFilter(event: Event) {
    //Leer el filtro
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //Si hay paginacion
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //#endregion


  //#region Limpiar Filtro
  async fnClearFilter() {
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    this.txtFiltro.setValue('');

  }
  //#endregion


  //#region Listar Invitados
  async fnListTable() {
    let nOpcion = 2
    let pParametro: any = [];

    await this.personaService.fnServicePersona(nOpcion, pParametro).subscribe({
      next: (data) => {

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.error(e)
      },
      //complete: () => console.info('complete')
    });
  }
  //#endregion

}
