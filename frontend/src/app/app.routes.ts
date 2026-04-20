import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
        import('./features/recipes/pages/recipes-list/recipes-list')
            .then(m => m.RecipesList),
    },
    {
        path: 'recipes',
        loadComponent: () => import('./features/recipes/pages/recipes-list/recipes-list').then(m => m.RecipesList),
        canActivate: [authGuard]
    },
    {
        path: 'recipes/create',
        loadComponent: () => import('./features/recipes/pages/create-recipe/create-recipe').then(m => m.CreateRecipe),
        canActivate: [authGuard]
    },
    {
        path: 'recipes/detail/:id',
        loadComponent: () => import('./features/recipes/pages/recipe-detail/recipe-detail').then(m => m.RecipeDetailComponent),
        canActivate: [authGuard]
    },
    {
        path: 'my-recipes',
        loadComponent: () => import('./features/recipes/pages/my-recipes/my-recipes').then(m => m.MyRecipes),
        canActivate: [authGuard]
    },
    {
        path: 'recipes/edit/:id',
        loadComponent: () => import('./features/recipes/pages/edit-recipe/edit-recipe').then(m => m.EditRecipe),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login').then(m => m.Login),
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/pages/register/register').then(m => m.Register)
    }
];
