import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Client, DashboardStats, LoginResponse, Order } from '../interfaces/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private router = inject(Router);

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.authApi}/auth/login`, credentials);
  }
  
  register(credentials: any): Observable<any> {
    return this.http.post(`${environment.authApi}/auth/register`, credentials);
  }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${environment.businessApi}/dashboard/stats`);
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${environment.businessApi}/clients`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.businessApi}/clients`, client);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(`${environment.businessApi}/orders`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.businessApi}/orders`, order);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.businessApi}/clients/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.businessApi}/clients/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${environment.businessApi}/orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.businessApi}/orders/${id}`);
  }
}