import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-invitados',
  templateUrl: './form-invitados.component.html',
  styleUrls: ['./form-invitados.component.scss']
})
export class FormInvitadosComponent implements OnInit {

  public innerWidth: any;
  mobile: boolean = false;

  sTitulo: string = "";
  nIdPersona: number = 0;

  formPersona: FormGroup;

  formUsuario = new FormControl();
  formPassword = new FormControl();
  UsuarioValido: boolean = false;

  listTipoInvitado = [
    { Id: 1, Descripcion: "Invitado" },
    { Id: 2, Descripcion: "Graduado" }
  ]

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {

    //#region Crear Formulario
    this.formPersona = this.formBuilder.group({
      'nIdPersona': [''],
      'sDNI': ['', Validators.required],

      'sApellidoPaterno': ['', Validators.required],
      'sApellidoMaterno': ['', Validators.required],
      'sNombre': ['', Validators.required],
      'sNombrePersona': [{ value: '', disabled: true }, Validators.required],
      'nTipoPersona': [1, Validators.required],
      'nMontoPagado': [30, Validators.required],

      'bEstado': ['']

    });
    //#endregion

  }

  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }

  }

  //#region Botón Salir/Atras
  fnExit() {
    this.router.navigate(['/', 'invitados'])
  }
  //#endregion


  //#region Detectar cambios en la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }
  //#endregion


  //#region Validaciones
  async fnValidar() {
    let bValidar: boolean = true;

    //Validar que todos los campos tengan datos
    if (this.formPersona.invalid) {
      Swal.fire({
        title: `Ingrese todos los campos obligatorios.`,
        icon: 'warning',
        timer: 1500
      });
      bValidar = false;
    }

    return bValidar;

  }
  //#endregion


  //#region Guardar Invitado
  async fnSave() {

    //Validaciones especificas de algunos campos
    if (!(await this.fnValidar())) {
      return
    }


    let pParametro = [];
    let nOpcion = this.nIdPersona == 0 ? 4 : 5; // 3-> Insertar / 4-> Editar

    pParametro.push(this.formPersona.controls["sDNI"].value);
    pParametro.push(this.formPersona.controls["sApellidoPaterno"].value);
    pParametro.push(this.formPersona.controls["sApellidoMaterno"].value);
    pParametro.push(this.formPersona.controls["sNombre"].value);
    pParametro.push(this.formPersona.controls["nTipoPersona"].value);
    pParametro.push(this.formPersona.controls["nMontoPagado"].value);
    pParametro.push(this.formPersona.controls["nIdPersona"].value);

    await this.personaService.fnServicePersona(nOpcion, pParametro).subscribe({
      next: (data) => {

        if (data.cod == 1) {
          Swal.fire({
            title: data.mensaje,
            icon: 'success',
            timer: 3500
          }).then(() => {
            this.fnExit();
          });
        }
      },
      error: (e) => {
        console.error(e)
      },
      //complete: () => console.info('complete')
    });
  }
  //#endregion


  //#region Obtener Nombre Completo
  getDataDni() {
    let param = this.formPersona.controls['sDNI'].value;

    if (param.length >= 8) {
      this.personaService.fnServiceDNI(param).subscribe({
        next: (data: any) => {

          this.formPersona.controls["sNombrePersona"].setValue(data.nombre);
          this.fnSplitName(data.nombre)

        }
      })
    }
    else {
      this.formPersona.controls["sNombrePersona"].setValue("");
    }
  }
  //#endregion


  //#region Asignar Nombres por Partes
  fnSplitName(nombreParam: string) {

    let nombreArray = nombreParam.split(" ")
    let sNombres: string = ""

    this.formPersona.controls["sApellidoPaterno"].setValue(nombreArray[0]);
    this.formPersona.controls["sApellidoMaterno"].setValue(nombreArray[1]);

    for (let i = 2; i < nombreArray.length; i++) {
      sNombres = sNombres + nombreArray[i] + " "
    }

    this.formPersona.controls["sNombre"].setValue(sNombres.trim());

  }
  //#endregion


  //#region Login
  async fnLogin() {

    let pParametro = [];
    let nOpcion = 7

    pParametro.push(this.formUsuario.value);
    pParametro.push(this.formPassword.value);

    await this.personaService.fnServicePersona(nOpcion, pParametro).subscribe({
      next: (data) => {

        if (data.cod == 1) {
          this.UsuarioValido = true
        }
        else {
          this.UsuarioValido = false
          Swal.fire({
            title: `Ingrese los datos correctamente.`,
            icon: 'warning',
            timer: 1500
          });
        }
      },
      error: (e) => {
        console.error(e)
      },
      //complete: () => console.info('complete')
    });
  }
  //#endregion


  //#region Obtener Datos desde Dni
  fnGetDataDni() {
    let paramDni = this.formPersona.controls['sDNI'].value;

    if (paramDni.length >= 8) {
      this.personaService.fnServiceDNI(paramDni).subscribe({
        next: (response: any) => {

          if (response.success = true) {
          this.formPersona.controls["sNombrePersona"].setValue(response.data.nombre_completo);

            this.formPersona.controls["sApellidoPaterno"].setValue(response.data.apellido_materno);
            this.formPersona.controls["sApellidoMaterno"].setValue(response.data.apellido_paterno);
            this.formPersona.controls["sNombre"].setValue(response.data.nombres);
          }

          console.log(response)

        }
      })
    }
    else {
      this.formPersona.controls["sNombrePersona"].setValue("");
    }

  }
  //#endregion

}
