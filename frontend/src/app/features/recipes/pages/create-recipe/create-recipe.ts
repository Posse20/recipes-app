import { Component, inject, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  imports: [],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe {

  private _recipesRouter = inject(RecipesService);
  private _router = inject(Router);

  public title = signal<string>('');

  protected createRecipe(){
    this._recipesRouter.createRecipe(this.title()).subscribe({
      next: (res) => {
        if(res){
          this._router.navigate(['/recipes']);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  protected goToRecipes(){
    this._router.navigate(['/recipes']);
  }

}
