import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { CompartirDatosService } from '../servicios/compartir-datos.service';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit {

  lista: any[] = [];
  listaOriginal: any[] = [];
  textoBusquedaNombre: string = '';
  textoBusquedaIngrediente: string = '';

  constructor(
    private apiService: ApiService,
    private compartirDatos: CompartirDatosService
  ) { }

  ngOnInit(): void {
    this.obtenerComidas();
  }

  // paltos pecio aleatorio
  obtenerComidas() {
    this.apiService.obtenerComidasIniciales()
      .then(data => {
        this.lista = data || [];
        this.listaOriginal = data || [];
      })
      .catch(error => {
        console.error('Error al obtener comidas:', error);
      });
  }

  // por nombre
  buscarPorNombre() {
    if (!this.textoBusquedaNombre.trim()) {
      this.lista = this.listaOriginal;
      return;
    }
    const termino = this.textoBusquedaNombre.toLowerCase();
    this.apiService.buscarComidaPorNombre(termino)
      .then(data => {
        this.lista = data || [];
      });
  }

  // por ingrediente
  buscarPorIngrediente() {
    if (!this.textoBusquedaIngrediente.trim()) {
      this.lista = this.listaOriginal;
      return;
    }
    const ingrediente = this.textoBusquedaIngrediente.toLowerCase();
    this.apiService.buscarComidaPorIngrediente(ingrediente)
      .then(data => {
        this.lista = data || [];
      });
  }

  // agregar plato
  agregarAlPedido(comida: any) {
    this.compartirDatos.agregarAlPedido({
      id: comida.idMeal,
      nombre: comida.strMeal,
      precio: comida.precio,
      imagen: comida.strMealThumb,
      tipo: 'comida'
    });
  }
}