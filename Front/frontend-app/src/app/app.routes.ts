import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
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
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    resolve: { misDatos: dashboardResolver } 
  },
  { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];