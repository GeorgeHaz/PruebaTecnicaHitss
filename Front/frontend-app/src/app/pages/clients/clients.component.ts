import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ApiService } from '../../services/api.service';
import { Client } from '../../interfaces/models';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  isEditing = false;
  clientIdToEdit: number | null = null;

  clients: Client[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];

  clientForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: ['']
  });

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.api.getClients().subscribe({
      next: (res: any) => {
        // Laravel con Resources devuelve { data: [...] }
        this.clients = res.data || res;
      },
      error: (err) => console.error(err)
    });
  }

  saveClient() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value as Client;

      if (this.isEditing && this.clientIdToEdit) {
        // MODO EDITAR
        this.api.updateClient(this.clientIdToEdit, clientData).subscribe({
          next: () => {
            alert('Cliente actualizado');
            this.resetForm();
            this.loadClients();
          },
          error: (err) => alert('Error al actualizar: ' + err.message)
        });
      } else {
        // MODO CREAR
        this.api.createClient(clientData).subscribe({
          next: () => {
            alert('Cliente creado');
            this.resetForm();
            this.loadClients();
          },
          error: (err) => alert('Error al crear: ' + err.message)
        });
      }
    }
  }

  onEdit(client: Client) {
    this.isEditing = true;
    this.clientIdToEdit = client.id!;
    this.clientForm.patchValue({
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      phone: client.phone,
      address: client.address
    });
  }

  // Eliminar cliente
  onDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.api.deleteClient(id).subscribe(() => {
        this.loadClients();
        alert('Cliente eliminado');
      });
    }
  }

  // Limpiar formulario
  resetForm() {
    this.isEditing = false;
    this.clientIdToEdit = null;
    this.clientForm.reset();
  }
}