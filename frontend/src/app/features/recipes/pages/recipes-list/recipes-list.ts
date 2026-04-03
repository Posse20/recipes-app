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

  ngOnInit(): void {
    this._recipesService.getRecipes().subscribe(data => {
      this.recipes.set(data);
    })
  }

  protected goToCreateRecipe(){
    this._router.navigate(['/recipes/create'])
  }

}
