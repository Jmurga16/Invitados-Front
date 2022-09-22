import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  url: string = environment.API_URL_INV

  constructor(private http: HttpClient) { }

  //#region Servicio Agregar/Editar/Eliminar Persona
  fnServicePersona(nOpcion: number, pParametro: any): Observable<any> {
    const urlEndPoint = this.url + 'PersonaService';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      nOpcion: nOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
  }
  //#endregion


  //#region Servicio DNI desde Api Peru Dev
  fnServiceDNI(paramDni: any) {

    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams()

    return this.http.get(this.url + "api/Dni?paramDni=" + paramDni);

  }
  //#endregion


}
