import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  private http = inject(HttpClient);
  
  private _apiUrl = 'http://localhost:3000';

  public getRecipes(): Observable<any> {
    return this.http.get(`${this._apiUrl}/recipes`);
  }

  public createRecipe(title: string){
    return this.http.post(`${this._apiUrl}/recipes`, { title });
  }

}
