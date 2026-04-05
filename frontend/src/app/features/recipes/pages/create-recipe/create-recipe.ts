import { Component, inject, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { Router } from '@angular/router';
import { IngredientsDetail } from '../../../../models/recipe-detail/IngredientsDetail';

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
  public mode = signal<string>('');
  public ingredientInput = signal<string>('');
  public quantityInput = signal<string>('');
  public process = signal<string>('');
  public ingredientsList = signal<IngredientsDetail[]>([]);

  protected createRecipe(){
    const body = {
      title: this.title(),
      process: this.process(),
      ingredients: this.ingredientsList().map(i => ({
        name: i.ingredient,
        quantity: i.quantity
      }))
    };
    this._recipesRouter.createRecipe(body).subscribe({
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

  protected selectedMode(mode: string){
    this.mode.set(mode);
  }

  protected onAddIngredient(){
    const ingredientDet: IngredientsDetail = {
      quantity: this.quantityInput(),
      ingredient: this.ingredientInput()
    };
    this.ingredientsList.update(prevVal => [ ...prevVal, ingredientDet ]);
    this.quantityInput.set('');
    this.ingredientInput.set('');
  }

  protected deleteIngredient(ingredient: string){
    this.ingredientsList.update(list => list.filter(x => x.ingredient !== ingredient));
  }

}
