import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    if (authService.isLoggedIn() || !environment.prod) {
        return true
    }

    router.navigate(["login"]);
    console.log("Route forbidden. Navigating to login")
    return false;
};
