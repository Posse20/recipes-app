import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes/recipes';
import { Router } from 'express';

@Component({
  selector: 'app-my-recipes',
  imports: [],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.css',
})
export class MyRecipes implements OnInit {
  private _recipesService = inject(RecipesService);
  private _router = inject(Router);

  recipes = signal<any[]>([]);
  deletedSuccessAlert = signal<boolean>(false);

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this._recipesService.getRecipesByUserId(userId).subscribe({
      next: res => {
        console.log('recetas x user', res);
      }
    })
  }

}
