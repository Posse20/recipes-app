import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  private http = inject(HttpClient);
  
  private _apiUrl = 'http://localhost:3000/recipes';

  public getRecipes(): Observable<any> {
    return this.http.get(`${this._apiUrl}/retrieve`);
  }

  public getRecipeById(recipeId: number) {
    return this.http.get(`${this._apiUrl}/retrieveById/${recipeId}`);
  }

  public createRecipe(body: any){
    return this.http.post(`${this._apiUrl}/create`, body);
  }

  public deleteRecipe(recipeId: number){
    return this.http.post(`${this._apiUrl}/delete`, { recipeId })
  }

}
