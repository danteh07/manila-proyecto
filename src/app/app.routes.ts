import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComidasComponent } from './comidas/comidas.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { JuegoComponent } from './juego/juego.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'comidas', component: ComidasComponent },
  { path: 'bebidas', component: BebidasComponent },
  { path: 'pedido', component: PedidosComponent },
  { path: 'juego', component: JuegoComponent }
];