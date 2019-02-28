import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargado = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProducto();
   }

   private cargarProducto() {

    return new Promise( ( resolve, reject) => {
      this.http.get('https://angular-portafolio-c0a8f.firebaseio.com/productos_idx.json')
      .subscribe(( resp: Producto[]) => {
        this.productos = resp;
        this.cargado = false;
        resolve();
      });
    });
   }

   getProducto( id: string ) {
     return this.http.get(`https://angular-portafolio-c0a8f.firebaseio.com/productos/${ id }.json`);
   }

   buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      this.cargarProducto().then( () => {
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }
   }

   private filtrarProductos(termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( producto => {

      const tituloLower = producto.titulo.toLowerCase();

        if ( producto.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
            this.productosFiltrado.push(producto);
        }
    });
   }
}
