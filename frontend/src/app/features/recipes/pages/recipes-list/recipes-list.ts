import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipesService } from '../../../../core/services/recipes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes-list',
  imports: [CommonModule],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.css',
  standalone: true
})
export class RecipesList implements OnInit {

  private _recipesService = inject(RecipesService);

  recipes = signal<any[]>([]);

  ngOnInit(): void {
    this._recipesService.getRecipes().subscribe(data => {
      console.log('data', data);
      this.recipes.set(data);
    })
  }

}
