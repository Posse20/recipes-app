import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FavoritesServices } from '../../../../core/services/favorites';

@Component({
  selector: 'app-recipes-list',
  imports: [CommonModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
  standalone: true
})
export class RecipesList implements OnInit {

  private _recipesService = inject(RecipesService);
  private _router = inject(Router);
  private _favortiteService = inject(FavoritesServices);

  recipes = signal<any[]>([]);
  deletedSuccessAlert = signal<boolean>(false);
  favoriteRecipesIds = signal<number[]>([]);

  ngOnInit(): void {
    this._retrieveAllRecipes();
    this._retrieveAllFavorites();
  }

  private _retrieveAllRecipes() {
    this._recipesService.getRecipes().subscribe({
      next: (res) => {
        this.recipes.set(res);
      }
    })
  }

  private _retrieveAllFavorites() {
    this._favortiteService.getAllFavorites().subscribe({
      next: (res) => {
        const recipesIds = res.map(x => x.recipeId);
        this.favoriteRecipesIds.set(recipesIds);
      }
    })
  }

  protected goToCreateRecipe(){
    this._router.navigate(['/recipes/create']);
  }

  protected goToRecipeDetail(recipeId: number) {
    this._router.navigate(['/recipes/detail', recipeId])
  }

  protected toggleFavorite(recipeId: number){

    const isFav = this.isFavorite(recipeId);

    if(isFav){
      this._favortiteService.removeFromFavoriteRecipe(recipeId).subscribe({
        next: () => {
          this.favoriteRecipesIds.update(ids => ids.filter(id => id !== recipeId));
        }
      });
    }else {
      this._favortiteService.addToFavoriteRecipe(recipeId).subscribe({
        next: () => {
          this.favoriteRecipesIds.update(prevs => [...prevs, recipeId]);
        }
      });
    }
  }

  protected isFavorite(id: number) {
    return this.favoriteRecipesIds().includes(id);
  }

}
