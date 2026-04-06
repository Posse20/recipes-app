import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  imports: [],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.css',
})
export class EditRecipe implements OnInit {

  private _recipesRouter = inject(RecipesService);
  private _router = inject(Router);
  private _activatedRouter = inject(ActivatedRoute);

  recipeId = signal<number>(0);
  public title = signal<string>('');
  public mode = signal<string>('');
  public ingredientInput = signal<string>('');
  public quantityInput = signal<string>('');
  public process = signal<string>('');
  public ingredientsList = signal<{name: string; quantity: string;}[]>([]);

  ngOnInit(): void {
    this._loadRecipeInfo();
  }

  private _loadRecipeInfo(){

    this._activatedRouter.paramMap.subscribe(params => {
      this.recipeId.set(Number(params.get('id')));
    });

    this._recipesRouter.getRecipeById(this.recipeId()).subscribe(res => {
      this.title.set(res.title);
      this.process.set(res.process);
      this.ingredientsList.set(
        res.ingredients.map((x: any) => ({
          name: x.name,
          quantity: x.quantity
        }))
      )
    })
  }

  protected onAddIngredient(){
    this.ingredientsList.update(list => [
      ...list,
      {
        name: this.ingredientInput(),
        quantity: this.quantityInput()
      }
    ]);
    this.ingredientInput.set('');
    this.quantityInput.set('');
  }

  protected deleteIngredient(ingredientName: string){
    this.ingredientsList.update(list => list.filter(x => x.name !== ingredientName));
  }

  protected goToRecipes(){
    this._router.navigate(['/recipes']);
  }

  protected editRecipe(){

    const body = {
      title: this.title(),
      process: this.process(),
      ingredients: this.ingredientsList().map(x => ({
        name: x.name,
        quantity: x.quantity
      }))
    };

    this._recipesRouter.editRecipe(this.recipeId(), body).subscribe(res => {
      this._router.navigate(['/recipes']);
    })
  }


}
