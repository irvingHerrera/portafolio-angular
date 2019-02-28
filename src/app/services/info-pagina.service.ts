import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pages.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  carga = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {
      this.carga = true;
      this.info = resp;
      console.log(resp);
    });
  }

  private cargarEquipo () {
    this.http.get('https://angular-portafolio-c0a8f.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {
      this.equipo = resp;
    });
  }

}
