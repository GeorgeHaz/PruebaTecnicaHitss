import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Client, Order } from '../../interfaces/models';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIcon
],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'] 
})
export class OrdersComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  isEditing = false;
  orderIdToEdit: number | null = null;

  orders: Order[] = [];
  clientsList: Client[] = [];
  displayedColumns: string[] = ['id', 'client', 'date', 'total', 'status', 'actions'];

  orderForm = this.fb.group({
    client_id: ['', Validators.required],
    total: ['', [Validators.required, Validators.min(1)]],
    order_date: [new Date().toISOString().split('T')[0], Validators.required],
    status: ['pending', Validators.required]
  });

  ngOnInit() {
    this.loadOrders();
    this.loadClients();
  }

  loadOrders() {
    this.api.getOrders().subscribe((res: any) => {
      this.orders = res.data || res;
    });
  }

  loadClients() {
    this.api.getClients().subscribe((res: any) => {
      this.clientsList = res.data || res;
    });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      // Convertir valores
      const formVal = this.orderForm.value;
      const orderData: Order = {
        client_id: Number(formVal.client_id),
        total: Number(formVal.total),
        order_date: formVal.order_date!,
        status: formVal.status as any
      };

      if (this.isEditing && this.orderIdToEdit) {
        // ACTUALIZAR
        this.api.updateOrder(this.orderIdToEdit, orderData).subscribe(() => {
           alert('Pedido actualizado');
           this.resetForm();
           this.loadOrders(); // Refrescar lista
        });
      } else {
        // CREAR
        this.api.createOrder(orderData).subscribe(() => {
           alert('Pedido creado');
           this.resetForm();
           this.loadOrders();
        });
      }
    }
  }

  onEdit(order: Order) {
    this.isEditing = true;
    this.orderIdToEdit = order.id!;
    this.orderForm.patchValue({
      client_id: String(order.client_id), // Select necesita string a veces si el value es string
      total: String(order.total),
      order_date: order.order_date,
      status: order.status
    });
  }

  onDelete(id: number) {
    if(confirm('¿Eliminar pedido?')) {
      this.api.deleteOrder(id).subscribe(() => this.loadOrders());
    }
  }

  resetForm() {
    this.isEditing = false;
    this.orderIdToEdit = null;
    this.orderForm.reset({ 
      status: 'pending', 
      order_date: new Date().toISOString().split('T')[0] 
    });
  }
}