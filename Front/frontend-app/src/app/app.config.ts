import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth.interceptor';

// 1. IMPORTAMOS Chart.js DIRECTAMENTE
import { Chart, registerables } from 'chart.js';

// 2. REGISTRAMOS LOS COMPONENTES GLOBALMENTE
Chart.register(...registerables);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    // 3. ELIMINAMOS 'provideCharts(...)' DE AQUÍ PORQUE NO EXISTE EN v5
  ]
};