import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Casilla {
  id: number;
  tipo: 'vacia' | 'comida' | 'bebida';
  imagen?: string;
  nombre?: string;
  encontrada: boolean;
}

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {
  comidaImg = 'https://www.themealdb.com/images/media/meals/1548772327.jpg';
  comidaNombre = 'Baked Salmon';
  
  bebidaImg = 'https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg';
  bebidaNombre = 'Mojito';

  casillasPlanas: Casilla[] = [];
  mensaje: string = '¡Encuentra el Plato y la Bebida escondidos en la cuadrícula!';
  juegoTerminado: boolean = false;

  constructor() {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.juegoTerminado = false;
    this.mensaje = '¡Busca y haz clic en el Plato y en la Bebida ocultos!';

    let temp: Casilla[] = [];

    // comida y bebida
    temp.push({ id: 0, tipo: 'comida', imagen: this.comidaImg, nombre: this.comidaNombre, encontrada: false });
    temp.push({ id: 1, tipo: 'bebida', imagen: this.bebidaImg, nombre: this.bebidaNombre, encontrada: false });

    // rellenar 14 vacias
    for (let i = 2; i < 16; i++) {
      temp.push({ id: i, tipo: 'vacia', encontrada: false });
    }

    // aleatorio
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    this.casillasPlanas = temp;
  }

  seleccionarCasilla(casilla: Casilla): void {
    if (this.juegoTerminado || casilla.encontrada) return;

    casilla.encontrada = true;

    if (casilla.tipo === 'comida') {
      this.mensaje = `¡Excelente! Encontraste el plato: ${casilla.nombre}. ¡Falta la bebida!`;
    } else if (casilla.tipo === 'bebida') {
      this.mensaje = `¡Increíble! Encontraste la bebida: ${casilla.nombre}. ¡Falta el plato!`;
    } else {
      this.mensaje = 'Casilla vacía. ¡Sigue buscando!';
    }

    const comidaEncontrada = this.casillasPlanas.some(c => c.tipo === 'comida' && c.encontrada);
    const bebidaEncontrada = this.casillasPlanas.some(c => c.tipo === 'bebida' && c.encontrada);

    if (comidaEncontrada && bebidaEncontrada) {
      this.juegoTerminado = true;
      this.mensaje = '🎉 ¡Felicitaciones! Encontraste ambos elementos. Reiniciando juego...';
      
      setTimeout(() => {
        this.iniciarJuego();
      }, 2500);
    }
  }
}
