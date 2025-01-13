import { Component } from '@angular/core';
import { GeografiaService } from 'src/app/services/geografia.service';

@Component({
  selector: 'app-geografia',
  templateUrl: './geografia.component.html',
  styleUrls: ['./geografia.component.css']
})
export class GeografiaComponent {

  geograficas: any[] = [];

  constructor(private geografiaService: GeografiaService) {}


  ngOnInit(): void {
    console.log('Cargando estructuras geográficas', this.geograficas);
    this.cargarEstructuraGeografica();
  }
  cargarEstructuraGeografica(): void {
    this.geografiaService.ObtenerEstructuraGeografica().subscribe(
      (data: any) => {
        if (data && data.geograficas) {
          // Convertimos la estructura jerárquica en una lista plana
          this.geograficas = this.flattenGeograficas(data.geograficas);
          console.log('Estructura geográfica cargada:', this.geograficas);
        } else {
          console.error('No se encontraron estructuras geográficas.');
        }
      },
      (error) => {
        console.error('Error al cargar estructuras geográficas:', error);
      }
    );
  }
  
  // Función para aplanar la estructura geográfica
  flattenGeograficas(geograficas: any[]): any[] {
    let flatList: any[] = [];
    const flatten = (items: any[], parentId: number | null = null) => {
      items.forEach((item) => {
        flatList.push({
          id: item.id,
          parentId: parentId,
          text: item.text,
        });
        if (item.items && item.items.length > 0) {
          flatten(item.items, item.id);
        }
      });
    };
    flatten(geograficas);
    return flatList;
  }
}  
  // // Función para aplanar la estructura jerárquica en un formato que TreeList entienda
  // procesarEstructuraGeografica(data: any[]): any[] {
  //   const resultado: any[] = [];
  //   const procesarNodo = (nodo: any, parentId: number | null = null) => {
  //     resultado.push({
  //       id: nodo.id,
  //       parentId: parentId,
  //       text: nodo.text
  //     });
  //     if (nodo.items && nodo.items.length > 0) {
  //       nodo.items.forEach((child: any) => procesarNodo(child, nodo.id));
  //     }
  //   };
  //   data.forEach((pais: any) => procesarNodo(pais));
  //   return resultado;
  // }
   // cargarEstructuraGeografica(): void {
  //   this.geografiaService.ObtenerEstructuraGeografica().subscribe(
  //     (data: any) => {
  //       if (data && data.geograficas) {
  //        this.geograficas = data.geograficas; // Asignar los datos al arreglo
  //         console.log('Estructura geográfica procesada:', this.geograficas);
  //       } else {
  //         console.error('No se encontraron estructuras geográficas.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error al cargar estructuras geográficas:', error);
  //     }
  //   );
  // }
