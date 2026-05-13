import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesServices {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/favorites';

  public addToFavoriteRecipe(recipeId: number){
    return this.http.post(`${this.apiUrl}/${recipeId}`, {});
  }

  public removeFromFavoriteRecipe(recipeId: number){
    return this.http.delete(`${this.apiUrl}/${recipeId}`);
  }

  public getAllFavorites(){
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
