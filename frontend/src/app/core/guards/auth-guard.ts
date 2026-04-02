import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const routerService = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  }

  routerService.navigate(['/login']);
  return false;

};
