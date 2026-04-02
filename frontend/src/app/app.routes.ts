import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'recipes',
        pathMatch: 'full'
    },
    {
        path: 'recipes',
        loadComponent: () => import('./features/recipes/pages/recipes-list/recipes-list').then(m => m.RecipesList),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login').then(m => m.Login),
    }
];
