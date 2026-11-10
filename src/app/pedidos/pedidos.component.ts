import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartirDatosService, ProductoPedido } from '../servicios/compartir-datos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(public compartirDatos: CompartirDatosService) { }

  pedidoConfirmado: boolean = false; // <-- Agrega esta línea

  ngOnInit(): void { }
// obtener

  // lista
  get listaPedido(): ProductoPedido[] {
    return this.compartirDatos.obtenerPedido();
  }

  // precio total
  get total(): number {
    return this.compartirDatos.obtenerTotal();
  }

// incrementar
  aumentarCantidad(item: ProductoPedido) {
    this.compartirDatos.actualizarCantidad(item.id, item.tipo, item.cantidad + 1);
  }

  // disminuir y eliminar
  disminuirCantidad(item: ProductoPedido) {
    if (item.cantidad > 1) {
      this.compartirDatos.actualizarCantidad(item.id, item.tipo, item.cantidad - 1);
    } else {
      this.eliminarItem(item);
    }
  }

  // eliminar
  eliminarItem(item: ProductoPedido) {
    this.compartirDatos.eliminarDelPedido(item.id, item.tipo);
  }

  // vaciar
  limpiarTodo() {
    this.compartirDatos.limpiarPedido();
  }

  // confirmar pedido
  confirmarPedido() {
    if (this.listaPedido.length === 0) return;
    this.limpiarTodo();
  }
}