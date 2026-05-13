import { Component, inject, OnInit, signal } from '@angular/core';
import { FavoritesServices } from '../../../../core/services/favorites/favorites';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-favs',
  imports: [],
  templateUrl: './recipes-favs.html',
  styleUrl: './recipes-favs.css',
})
export class RecipesFavsComponent implements OnInit {

  private _router = inject(Router);
  private _favortiteService = inject(FavoritesServices);

  protected favoriteRecipesIds = signal<number[]>([]);
  protected recipesFavsList = signal<any[]>([]);

  ngOnInit(): void {
    this._retrieveAllFavs();
  }

  private _retrieveAllFavs(){
    this._favortiteService.getAllFavorites().subscribe({
      next: res => {
        res.forEach(x => {
          this.recipesFavsList.update(prev => [...prev, x.recipe]);
          this.favoriteRecipesIds.update(prevId => [...prevId, x.id]);
        });
      }
    });
  }

  protected removeFavorite(recipeId: number){
    this._favortiteService.removeFromFavoriteRecipe(recipeId).subscribe({
      next: () => {
        this.favoriteRecipesIds.set([]);
        this.recipesFavsList.set([]);
        this._retrieveAllFavs();
      }
    });
  }

  protected goToRecipeDetail(recipeId: number) {
    this._router.navigate(['/recipes/detail', recipeId])
  }

}
