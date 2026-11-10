import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { CompartirDatosService } from '../servicios/compartir-datos.service';

@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent implements OnInit {

  lista: any[] = [];
  listaOriginal: any[] = [];
  
  textoNombre: string = '';
  textoIngrediente: string = '';
  filtroActivo: string = 'todas';

  constructor(
    private apiService: ApiService,
    private compartirDatos: CompartirDatosService
  ) { }

  ngOnInit(): void {
    this.obtenerBebidasIniciales();
  }

  // listado
  obtenerBebidasIniciales() {
    this.apiService.obtenerBebidasIniciales()
      .then(data => {
        this.lista = data || [];
        this.listaOriginal = data || [];
        this.filtroActivo = 'todas';
      })
      .catch(error => {
        console.error('Error al obtener bebidas:', error);
      });
  }

  // nombre coctel
  buscarPorNombre() {
    if (!this.textoNombre.trim()) {
      this.lista = this.listaOriginal;
      return;
    }
    const termino = this.textoNombre.toLowerCase();
    this.apiService.buscarBebidaPorNombre(termino)
      .then(data => {
        this.lista = data || [];
      });
  }

  // nombre ingredfientes
  buscarPorIngrediente() {
    if (!this.textoIngrediente.trim()) {
      this.lista = this.listaOriginal;
      return;
    }
    const ingrediente = this.textoIngrediente.toLowerCase();
    this.apiService.buscarBebidaPorIngrediente(ingrediente)
      .then(data => {
        this.lista = data || [];
      });
  }

  // con o sin alcohol
  filtrarPorTipo(tipo: 'Alcoholic' | 'Non_Alcoholic') {
    this.filtroActivo = tipo;
    const metodo = tipo === 'Alcoholic' ? this.apiService.obtenerBebidasAlcoholicas() : this.apiService.obtenerBebidasSinAlcohol();
    metodo.then(data => {
      this.lista = data || [];
      this.listaOriginal = data || [];
    });
  }

  // categorias
  filtrarPorCategoria(categoria: 'Ordinary_Drink' | 'Cocktail') {
    this.filtroActivo = categoria;
    const metodo = categoria === 'Cocktail' ? this.apiService.obtenerBebidasCoctel() : this.apiService.obtenerBebidasOrdinarias();
    metodo.then(data => {
      this.lista = data || [];
      this.listaOriginal = data || [];
    });
  }

  // al pedido
  agregarAlPedido(bebida: any) {
    this.compartirDatos.agregarAlPedido({
      id: bebida.idDrink,
      nombre: bebida.strDrink,
      precio: bebida.precio,
      imagen: bebida.strDrinkThumb,
      tipo: 'bebida'
    });
  }
}