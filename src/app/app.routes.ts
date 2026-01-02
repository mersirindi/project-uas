import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { Dashboard } from './pages/dashboard/dashboard'; // Sesuaikan path ini
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Jika alamat kosong (root), langsung arahkan ke login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Halaman Public (Bisa diakses siapa saja)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Halaman Private (Hanya bisa diakses jika sudah login)
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard], // <--- Pasang satpam di sini
  },

  // (Opsional) Wildcard: jika user mengetik alamat ngawur, kembalikan ke login
  { path: '**', redirectTo: 'login' },
];
