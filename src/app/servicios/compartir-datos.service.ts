import { Injectable } from '@angular/core';

export interface ProductoPedido {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  tipo: 'comida' | 'bebida';
}

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {

  private listaPedido: ProductoPedido[] = [];

  constructor() { }

  // Agregar un producto al pedido o incrementar cantidad si ya existe
  agregarAlPedido(producto: { id: string; nombre: string; precio: number; imagen: string; tipo: 'comida' | 'bebida' }) {
    const itemExistente = this.listaPedido.find(p => p.id === producto.id && p.tipo === producto.tipo);

    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.listaPedido.push({
        ...producto,
        cantidad: 1
      });
    }
  }

  // Obtener la lista completa actual
  obtenerPedido(): ProductoPedido[] {
    return this.listaPedido;
  }

  // Cambiar cantidad de un ítem
  actualizarCantidad(id: string, tipo: string, cantidad: number) {
    const item = this.listaPedido.find(p => p.id === id && p.tipo === tipo);
    if (item && cantidad > 0) {
      item.cantidad = cantidad;
    }
  }

  // Eliminar un item
  eliminarDelPedido(id: string, tipo: string) {
    this.listaPedido = this.listaPedido.filter(p => !(p.id === id && p.tipo === tipo));
  }

  // Vaciar el carrito
  limpiarPedido() {
    this.listaPedido = [];
  }

  // Obtener el total a pagar
  obtenerTotal(): number {
    return this.listaPedido.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
  }
}