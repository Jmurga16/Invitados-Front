import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-invitados',
  templateUrl: './lista-invitados.component.html',
  styleUrls: ['./lista-invitados.component.scss']
})
export class ListaInvitadosComponent implements OnInit {

  //#region Variables
  txtFiltro = new FormControl();
  sTitulo: string = "";
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'sDNI',
    'sNombrePersona',
    //'Acciones'
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

    this.fnListInvitados();

  }

  //#region Ruta Agregar
  fnAgregar() {
    this.router.navigate(['/', 'invitados', 'agregar'])
  }
  //#endregion


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
  async fnListInvitados() {
    let nOpcion = 1
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

  fnCambiarEstado(idPersona: number, estado: number) {

  }
  fnEditar(idPersona: number, estado: number) {

  }


}
