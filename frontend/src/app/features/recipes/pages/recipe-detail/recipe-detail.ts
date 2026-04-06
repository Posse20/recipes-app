import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDetail } from '../../../../models/recipe-detail/RecipeDetail';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetailComponent implements OnInit {

  private _recipeService = inject(RecipesService);
  private _activatedRouter = inject(ActivatedRoute);
  private _router = inject(Router)

  recipeId = signal<number>(0);
  recipeDetail = signal<RecipeDetail | null>(null);
  ingredientsList = computed(() => {
    return this.recipeDetail()?.ingredients ?? []
  })

  ngOnInit(): void {
    this.componentInit();
  }

  private async componentInit() {
    this._activatedRouter.paramMap.subscribe(params => {
      this.recipeId.set(Number(params.get('id')));
    });

    this._recipeService.getRecipeById(this.recipeId()).subscribe(res => {
      this.recipeDetail.set(res);
      console.log('recipe', this.recipeDetail());
    });
  }

  protected backToRecipes(){
    this._router.navigate(['/']);
  }

}
