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
        loadComponent: () => import('./features/recipes/pages/create-recipe/create-recipe').then(m => m.CreateRecipe)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login').then(m => m.Login),
    }
];
