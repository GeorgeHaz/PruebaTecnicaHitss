import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DashboardStats } from '../interfaces/models';

// Esta función se ejecuta ANTES de entrar a la ruta
export const dashboardResolver: ResolveFn<DashboardStats> = (route, state) => {
  const api = inject(ApiService);

  return api.getStats();
};