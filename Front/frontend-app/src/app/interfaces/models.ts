export interface LoginResponse {
  isSuccess: boolean;
  data: string;
  message: string;
  errors: any;
}

export interface DashboardStats {
  kpis: {
    total_orders: number;
    active_clients: number;
    pending_orders: number;
    completed_orders: number;
  };
  charts: {
    orders_by_status: { [key: string]: number };
    activity_last_30_days: any[];
  };
}

export interface Client {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id?: number;
  client_id: number;
  order_date: string;
  total: number;
  status: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO';
  client?: Client; 
}