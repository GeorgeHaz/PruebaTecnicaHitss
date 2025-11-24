import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component'; // <--- El nuevo layout
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { dashboardResolver } from './core/dashboard.resolver';

const authGuard = () => {
  if (localStorage.getItem('token')) return true;
  inject(Router).navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        resolve: { misDatos: dashboardResolver } 
      },
      { path: 'clients', component: ClientsComponent },
      { path: 'orders', component: OrdersComponent },
      
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
  { path: '**', redirectTo: 'login' }
];