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

  buscarComidaPorIngrediente(ingrediente: string): Promise<any[]> {
    return fetch(`${this.mealUrl}/filter.php?i=${encodeURIComponent(ingrediente)}`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.meals))
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
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al buscar bebida por ingrediente:', err);
        return [];
      });
  }

  obtenerBebidasAlcoholicas(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Alcoholic`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas alcohólicas:', err);
        return [];
      });
  }

  obtenerBebidasSinAlcohol(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?a=Non_Alcoholic`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas sin alcohol:', err);
        return [];
      });
  }

  obtenerBebidasOrdinarias(): Promise<any[]> {
    return fetch(`${this.cocktailUrl}/filter.php?c=Ordinary_Drink`)
      .then(res => res.json())
      .then(data => this.agregarPrecioAleatorio(data.drinks))
      .catch(err => {
        console.error('Error al obtener bebidas ordinarias:', err);
        return [];
      });
  }

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