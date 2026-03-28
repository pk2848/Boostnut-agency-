import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn) {
    router.navigate(['/erp/login']);
    return false;
  }

  const requiredRole = route.data?.['role'] as string | undefined;
  if (requiredRole && auth.user()?.role !== requiredRole) {
    // Redirect to the correct panel
    router.navigate([auth.isAdmin ? '/erp/admin' : '/erp/student']);
    return false;
  }

  return true;
};
