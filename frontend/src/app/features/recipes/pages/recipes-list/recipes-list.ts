import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  recipes = signal<any[]>([]);
  deletedSuccessAlert = signal<boolean>(false);

  ngOnInit(): void {
    this._recipesService.getRecipes().subscribe(data => {
      this.recipes.set(data);
    })
  }

  protected goToCreateRecipe(){
    this._router.navigate(['/recipes/create']);
  }

  protected deleteRecipe(recipeId: number){
    this._recipesService.deleteRecipe(recipeId).subscribe(() => {
      this.deletedSuccessAlert.set(true);
      this.recipes.update(val => val.filter(x => x.id !== recipeId));
      setTimeout(() => {
        this.deletedSuccessAlert.set(false);
      }, 2000);
    });
  }

}
