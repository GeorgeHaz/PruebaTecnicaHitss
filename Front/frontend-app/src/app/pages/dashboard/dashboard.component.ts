import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { DashboardStats } from '../../interfaces/models';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    NgChartsModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  
  stats: DashboardStats | null = null;

  public pieChartOptions: ChartOptions<'pie'> = { responsive: false };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  };

  get kpiList() {
    return [
      { label: 'Total Pedidos', value: this.stats?.kpis?.total_orders || 0, icon: 'shopping_bag', color: '#3f51b5' },
      { label: 'Clientes Activos', value: this.stats?.kpis?.active_clients || 0, icon: 'group', color: '#4caf50' },
      { label: 'Pendientes', value: this.stats?.kpis?.pending_orders || 0, icon: 'pending', color: '#ff9800' },
      { label: 'Completados', value: this.stats?.kpis?.completed_orders || 0, icon: 'check_circle', color: '#9c27b0' },
    ];
  }

  ngOnInit() {
    // EN LUGAR DE LLAMAR A LA API, LEEMOS DEL RESOLVER
    this.route.data.subscribe(({ misDatos }) => {
      // 'misDatos' es el nombre que le pusimos en app.routes.ts
      this.stats = misDatos;
      this.setupCharts(this.stats!);
    });
  }

  setupCharts(data: DashboardStats) {
    if (data.charts && data.charts.orders_by_status) {
      this.pieChartData = {
        labels: Object.keys(data.charts.orders_by_status),
        datasets: [{ data: Object.values(data.charts.orders_by_status) }]
      };
    }
  }

  logout() {
    this.api.logout();
  }
}