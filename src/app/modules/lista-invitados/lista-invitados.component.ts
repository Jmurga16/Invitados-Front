import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { TableUtil } from "src/shared/ts/tableUtil";
import PersonaData from 'src/shared/data/PersonaData.json'
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
    let modeDemo = localStorage.getItem("demo")

    if (modeDemo == "false") {

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
        }
      });
    }
    else {
      this.dataSource = new MatTableDataSource(PersonaData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }
  }
  //#endregion


  //#region Exportar Tabla a Excel
  exportTable() {
    TableUtil.exportTableToExcel("MaterialTable", "Lista_Invitados");
  }
  //#endregion


  //#region Editar
  fnEditar(dniPersona: number) {

    this.router.navigate(['/', 'invitados', 'editar', dniPersona])
  }
  //#endregion


  //#region Eliminar/Activar
  async fnCambiarEstado(idPersona: number, bEstadoDestino: number) {

    let sTitulo, sRespuesta: string = "";

    if (bEstadoDestino == 1) {
      sTitulo = '¿Desea activar el usuario?'
      sRespuesta = 'Se activó el usuario con éxito'
    }
    else {
      sTitulo = '¿Desea eliminar el usuario?'
      sRespuesta = 'Se eliminó el usuario con éxito'
    }

    var resp = await Swal.fire({
      title: sTitulo,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    })

    if (!resp.isConfirmed) {
      return;
    }

    let pParametro = [];
    pParametro.push(idPersona);
    pParametro.push(bEstadoDestino);

    await this.personaService.fnServicePersona(5, pParametro).subscribe({
      next: (data) => {

        if (data.cod == 1) {
          Swal.fire({
            title: sRespuesta,
            icon: 'success',
            timer: 3500
          })
        }
        this.fnListInvitados();
      },
      error: (e) => console.error(e)
    });


  }
  //#endregion Eliminar

}
