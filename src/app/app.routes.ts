import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/landing/landing.component').then(m => m.LandingComponent),
  },
  {
    path: 'erp/login',
    loadComponent: () =>
      import('./components/erp/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'erp/admin',
    loadComponent: () =>
      import('./components/erp/admin-dashboard/admin-dashboard.component').then(
        m => m.AdminDashboardComponent
      ),
    canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: 'erp/student',
    loadComponent: () =>
      import('./components/erp/student-panel/student-panel.component').then(
        m => m.StudentPanelComponent
      ),
    canActivate: [authGuard],
    data: { role: 'student' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
