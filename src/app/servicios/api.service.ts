import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mealUrl = 'https://www.themealdb.com/api/json/v1/1';
  private cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor() { }

  private agregarPrecioAleatorio(items: any[]): any[] {
    if (!items) return [];
    return items.map(item => ({
      ...item,
      precio: Math.floor(Math.random() * (45000 - 18000 + 1)) + 18000
    }));
  }

  // Método auxiliar para obtener el detalle completo por ID cuando el filtro es resumido
  private async completarDetallesComidas(items: any[]): Promise<any[]> {
    if (!items || items.length === 0) return [];
    
    // Consultamos el detalle completo (lookup) para cada plato obtenido
    const promesasDetalle = items.map(async (item) => {
      try {
        const res = await fetch(`${this.mealUrl}/lookup.php?i=${item.idMeal}`);
        const data = await res.json();
        return data.meals ? data.meals[0] : item;
      } catch (e) {
        return item; // Si falla uno, devolvemos el original
      }
    });

    const comidasCompletas = await Promise.all(promesasDetalle);
    return this.agregarPrecioAleatorio(comidasCompletas);
  }

  private async completarDetallesBebidas(items: any[]): Promise<any[]> {
    if (!items || items.length === 0) return [];
    
    const promesasDetalle = items.map(async (item) => {
      try {
        const res = await fetch(`${this.cocktailUrl}/lookup.php?i=${item.idDrink}`);
        const data = await res.json();
        return data.drinks ? data.drinks[0] : item;
      } catch (e) {
        return item;
      }
    });

    const bebidasCompletas = await Promise.all(promesasDetalle);
    return this.agregarPrecioAleatorio(bebidasCompletas);
  }

  obtenerComidasIniciales(): Promise<any[]> {
    return fetch(`${this.mealUrl}/search.php?s=`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
      .catch(err => {
        console.error('Error al obtener comidas iniciales:', err);
        return [];
      });
  }

  buscarComidaPorNombre(nombre: string): Promise<any[]> {
    return fetch(`${this.mealUrl}/search.php?s=${encodeURIComponent(nombre)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
      .catch(err => {
        console.error('Error al buscar comida por nombre:', err);
        return [];
      });
  }

  // Ahora usa el completador de detalles para traer los ingredientes
  buscarComidaPorIngrediente(ingrediente: string): Promise<any[]> {
    return fetch(`${this.mealUrl}/filter.php?i=${encodeURIComponent(ingrediente)}`)
      .then(res => res.json())
      .then(data => this.completarDetallesComidas(data.meals))
      .catch(err => {
        console.error('Error al buscar comida por ingrediente:', err);
        return [];
      });
  }

  obtenerBebidasIniciales(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/search.php?s=a`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas iniciales:', err);
        return [];
      });
  }

  buscarBebidaPorNombre(nombre: string): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/search.php?s=${encodeURIComponent(nombre)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al buscar bebida por nombre:', err);
        return [];
      });
  }

  buscarBebidaPorIngrediente(ingrediente: string): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?i=${encodeURIComponent(ingrediente)}`)
      .then(res => res.json())
      .then(data => this.completarDetallesBebidas(data.drinks))
      .catch(err => {
        console.error('Error al buscar bebida por ingrediente:', err);
        return [];
      });
  }

  obtenerBebidasAlcoholicas(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Alcoholic`)
      .then(res => res.json())
      .then(data => this.completarDetallesBebidas(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas alcohólicas:', err);
        return [];
      });
  }

  obtenerBebidasSinAlcohol(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Non_Alcoholic`)
      .then(res => res.json())
      .then(data => this.completarDetallesBebidas(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas sin alcohol:', err);
        return [];
      });
  }

  obtenerBebidasOrdinarias(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?c=Ordinary_Drink`)
      .then(res => res.json())
      .then(data => this.completarDetallesBebidas(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas ordinarias:', err);
        return [];
      });
  }

  obtenerBebidasCoctel(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?c=Cocktail`)
      .then(res => res.json())
      .then(data => this.completarDetallesBebidas(data.drinks))
      .catch(err => {
        console.error('Error al obtener cócteles:', err);
        return [];
      });
  }
}