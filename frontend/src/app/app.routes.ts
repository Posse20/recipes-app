import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        loadComponent: () => 
            import('./features/recipes/pages/recipes-list/recipes-list').then(m => m.RecipesList),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login').then(m => m.Login),
    }
];
