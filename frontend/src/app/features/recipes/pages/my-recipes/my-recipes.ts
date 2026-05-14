import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  imports: [],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.css',
})
export class MyRecipes implements OnInit {
  private _recipesService = inject(RecipesService);
  private _router = inject(Router);

  myRecipes = signal<any[]>([]);
  deletedSuccessAlert = signal<boolean>(false);

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this._recipesService.getRecipesByUserId(userId).subscribe({
      next: res => {
        this.myRecipes.set(res);
      }
    })
  }

  protected goToCreateRecipe(){
    this._router.navigate(['/recipes/create']);
  }

  protected goToEditRecipe(recipeId: number) {
    this._router.navigate(['/recipes/edit', recipeId])
  }

  protected deleteRecipe(recipeId: number){
    this._recipesService.deleteRecipe(recipeId).subscribe(() => {
      this.deletedSuccessAlert.set(true);
      this.myRecipes.update(val => val.filter(x => x.id !== recipeId));
      setTimeout(() => {
        this.deletedSuccessAlert.set(false);
      }, 2000);
    });
  }

}
