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
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
  filterStatus: string = '';
  filterDate: string = '';

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
    this.loadClients();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    const filters = {
      status: this.filterStatus,
      date: this.filterDate
    };

    this.api.getClients().subscribe((res: any) => {
      this.clientsList = res.data || res;
    });

    this.api.getOrders(filters).subscribe({
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
          Swal.fire({
            icon: 'success',
            title: 'Operación Exitosa',
            text: this.isEditing ? 'Pedido actualizado correctamente' : 'Pedido registrado correctamente',
            timer: 2000
          });
          this.resetForm();
          this.loadData();
          this.isSaving = false;
        },
        error: (err) => {
          Swal.fire('Oops...', 'Algo salió mal al guardar el pedido', 'error');
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
    Swal.fire({
      title: '¿Eliminar Pedido?',
      text: "Esta acción borrará el registro permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.api.deleteOrder(id).subscribe({
          next: () => {
            this.loadData();
            Swal.fire('Borrado', 'El pedido ha sido eliminado.', 'success');
          },
          error: () => {
            this.isLoading = false;
            Swal.fire('Error', 'No se pudo eliminar.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.isEditing = false;
    this.orderIdToEdit = null;
    this.orderForm.reset({
      status: 'pending',
      order_date: new Date().toISOString().split('T')[0]
    });
  }

  clearFilters() {
    this.filterStatus = '';
    this.filterDate = '';
    this.loadData();
  }

  loadClients() {
    this.api.getClients().subscribe((res: any) => {
      this.clientsList = res.data || res;
    });
  }
}