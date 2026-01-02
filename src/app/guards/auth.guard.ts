import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Cek apakah ada user yang sedang login
  if (authService.getCurrentUser()) {
    return true; // Boleh masuk
  } else {
    // Jika tidak ada, paksa pindah ke halaman login
    router.navigate(['/login']);
    return false; // Dilarang masuk
  }
};
