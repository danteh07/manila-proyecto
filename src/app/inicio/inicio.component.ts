import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../servicios/api.service';
import { CompartirDatosService } from '../servicios/compartir-datos.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  platoEstrella: any = null;
  bebidaEstrella: any = null;

  constructor(
    private apiService: ApiService,
    private compartirDatos: CompartirDatosService
  ) { }

  ngOnInit(): void {
    this.cargarEspeciales();
  }

  cargarEspeciales() {
    this.apiService.obtenerComidasIniciales()
      .then(comidas => {
        if (comidas && comidas.length > 0) {
          this.platoEstrella = comidas[0];
        }
      });

    this.apiService.buscarBebidaPorNombre('margarita')
      .then(bebidas => {
        if (bebidas && bebidas.length > 0) {
          this.bebidaEstrella = bebidas[0];
        } else {
          this.apiService.obtenerBebidasIniciales().then(b => this.bebidaEstrella = b[0]);
        }
      });
  }

  agregarPlatoAlPedido() {
    if (!this.platoEstrella) return;
    this.compartirDatos.agregarAlPedido({
      id: this.platoEstrella.idMeal,
      nombre: this.platoEstrella.strMeal,
      precio: this.platoEstrella.precio,
      imagen: this.platoEstrella.strMealThumb,
      tipo: 'comida'
    });
  }

  agregarBebidaAlPedido() {
    if (!this.bebidaEstrella) return;
    this.compartirDatos.agregarAlPedido({
      id: this.bebidaEstrella.idDrink,
      nombre: this.bebidaEstrella.strDrink,
      precio: this.bebidaEstrella.precio,
      imagen: this.bebidaEstrella.strDrinkThumb,
      tipo: 'bebida'
    });
  }
}