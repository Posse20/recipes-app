import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail implements OnInit {

  private _recipeService = inject(RecipesService);
  private _activatedRouter = inject(ActivatedRoute);
  private _router = inject(Router)

  recipeId = signal<number>(0);
  recipeDetail = signal<any>(null);

  ngOnInit(): void {
    this.componentInit();
  }

  private async componentInit() {
    this._activatedRouter.paramMap.subscribe(params => {
      this.recipeId.set(Number(params.get('id')));
    });

    this._recipeService.getRecipeById(this.recipeId()).subscribe(res => {
      this.recipeDetail.set(res);
    });
  }

  protected backToRecipes(){
    this._router.navigate(['/']);
  }

}
