import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mealUrl = 'https://www.themealdb.com/api/json/v1/1';
  private cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor() { }

  // Función auxiliar para asignar precios aleatorios
  private agregarPrecioAleatorio(items: any[]): any[] {
    if (!items) return [];
    return items.map(item => ({
      ...item,
      precio: Math.floor(Math.random() * (45000 - 18000 + 1)) + 18000
    }));
  }

  // ==========================================
  // APIS DE COMIDAS (TheMealDB)
  // ==========================================

  // Obtener comidas por defecto (por letra 'a' o búsqueda base)
  obtenerComidasIniciales(): Promise<any[]> {
    return fetch(`${this.mealUrl}/search.php?s=`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
      .catch(err => {
        console.error('Error al obtener comidas iniciales:', err);
        return [];
      });
  }

  // Buscar comida por nombre (ejemplo: search.php?s=Arrabiata)
  buscarComidaPorNombre(nombre: string): Promise<any[]> {
    return fetch(`${this.mealUrl}/search.php?s=${encodeURIComponent(nombre)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
      .catch(err => {
        console.error('Error al buscar comida por nombre:', err);
        return [];
      });
  }

  // Buscar comida por ingrediente (ejemplo: filter.php?i=chicken_breast)
  buscarComidaPorIngrediente(ingrediente: string): Promise<any[]> {
    return fetch(`${this.mealUrl}/filter.php?i=${encodeURIComponent(ingrediente)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
      .catch(err => {
        console.error('Error al buscar comida por ingrediente:', err);
        return [];
      });
  }

  // ==========================================
  // APIS DE BEBIDAS (TheCocktailDB)
  // ==========================================

  // Obtener bebidas iniciales
  obtenerBebidasIniciales(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/search.php?s=a`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas iniciales:', err);
        return [];
      });
  }

  // Buscar bebida por nombre (ejemplo: search.php?s=margarita)
  buscarBebidaPorNombre(nombre: string): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/search.php?s=${encodeURIComponent(nombre)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al buscar bebida por nombre:', err);
        return [];
      });
  }

  // Buscar bebida por ingrediente (ejemplo: filter.php?i=vodka)
  buscarBebidaPorIngrediente(ingrediente: string): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?i=${encodeURIComponent(ingrediente)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al buscar bebida por ingrediente:', err);
        return [];
      });
  }

  // Filtrar bebida por tipo alcohólica (filter.php?a=Alcoholic)
  obtenerBebidasAlcoholicas(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Alcoholic`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas alcohólicas:', err);
        return [];
      });
  }

  // Filtrar bebida sin alcohol (filter.php?a=Non_Alcoholic)
  obtenerBebidasSinAlcohol(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Non_Alcoholic`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas sin alcohol:', err);
        return [];
      });
  }

  // Filtrar por categoría bebida ordinaria (filter.php?c=Ordinary_Drink)
  obtenerBebidasOrdinarias(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?c=Ordinary_Drink`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas ordinarias:', err);
        return [];
      });
  }

  // Filtrar por categoría cóctel (filter.php?c=Cocktail)
  obtenerBebidasCoctel(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?c=Cocktail`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener cócteles:', err);
        return [];
      });
  }
}