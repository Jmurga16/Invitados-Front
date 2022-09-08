import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  url: string = environment.API_URL_INV
  dni_url: string = 'https://api.migo.pe/api/v1/dni';
  apiUrl = "https://api.apis.net.pe/v1/dni?numero="
  auth_token = "apis-token-2791.3kWiygZ1dlxBZww-NHDtBXY99q34dgFb"

  constructor(private http: HttpClient) { }

  fnServicePersona(nOpcion: number, pParametro: any): Observable<any> {
    const urlEndPoint = this.url + 'PersonaService';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      nOpcion: nOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
  }

  fnServiceDNI(paramDni: any) {

    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = new HttpParams()
    
    return this.http.get(this.url + "api/Dni?paramDni="+paramDni);

  }

  fnServiceDNI4(paramDni: any) {
    let data = {
      token: 'zpFC9p5DTfbISplZYFxb8TLUkcGycFl99RCiz0K8k94QoqcuESmePg6stCG0',
      dni: paramDni,
    };

    return this.http.post(this.dni_url, data);
  }

  fnServiceDNI2(paramDni: any) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Referer: 'http://apis.net.pe/v1/dni',
      Authorization: `Bearer ${this.auth_token}`,
    });

    const params = new HttpParams()
    params.append("numero", paramDni)

    const requestOptions = {
      headers: headers,
      params: params
    };

    return this.http.get(this.apiUrl + paramDni, requestOptions);

  }






}
