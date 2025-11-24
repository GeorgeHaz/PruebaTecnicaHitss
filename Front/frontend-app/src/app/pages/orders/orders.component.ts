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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatIcon,
    MatProgressSpinnerModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  isLoading = false;
  isSaving = false;
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
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.api.getClients().subscribe((res: any) => {
      this.clientsList = res.data || res;
    });

    this.api.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res.data || res;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      this.isSaving = true;

      const formVal = this.orderForm.value;
      const orderData: Order = {
        client_id: Number(formVal.client_id),
        total: Number(formVal.total),
        order_date: formVal.order_date!,
        status: formVal.status as any
      };

      const request$ = (this.isEditing && this.orderIdToEdit)
        ? this.api.updateOrder(this.orderIdToEdit, orderData)
        : this.api.createOrder(orderData);
      request$.subscribe({
        next: () => {
          alert(this.isEditing ? 'Pedido actualizado' : 'Pedido registrado');
          this.resetForm();
          this.loadData();
          this.isSaving = false;
        },
        error: (err) => {
          alert('Error: ' + err.message);
          this.isSaving = false
        }
      });
    }
  }


  onEdit(order: Order) {
    this.isEditing = true;
    this.orderIdToEdit = order.id!;
    this.orderForm.patchValue({
      client_id: String(order.client_id),
      total: String(order.total),
      order_date: order.order_date,
      status: order.status
    });
  }

  onDelete(id: number) {
    if (confirm('¿Eliminar pedido?')) {
      this.isLoading = true;
      this.api.deleteOrder(id).subscribe({
        next: () => this.loadData(),
        error: () => {
          alert('Error al eliminar');
          this.isLoading = false;
        }
      });
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