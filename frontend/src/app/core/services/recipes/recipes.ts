import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDetail } from '../../../models/recipe-detail/RecipeDetail';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  private http = inject(HttpClient);
  
  private _apiUrl = 'http://localhost:3000/recipes';

  public getRecipes(): Observable<any> {
    return this.http.get(`${this._apiUrl}/retrieve`);
  }

  public getRecipeById(recipeId: number): Observable<RecipeDetail> {
    return this.http.get<RecipeDetail>(`${this._apiUrl}/retrieveById/${recipeId}`);
  }

  public createRecipe(body: any){
    return this.http.post(`${this._apiUrl}/create`, body);
  }

  public deleteRecipe(recipeId: number){
    return this.http.post(`${this._apiUrl}/delete`, { recipeId })
  }

  public editRecipe(recipeId: number, body: any){
    return this.http.put(`${this._apiUrl}/edit/${recipeId}`, body);
  }

}
