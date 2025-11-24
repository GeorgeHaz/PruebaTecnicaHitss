import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApiService } from '../../services/api.service';
import { Client } from '../../interfaces/models';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  isEditing = false;
  isLoading = false;
  isSaving = false;
  clientIdToEdit: number | null = null;
  searchTerm: string = '';

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
    this.isLoading = true;

    this.api.getClients(this.searchTerm).subscribe({
      next: (res: any) => {
        this.clients = res.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  saveClient() {
    if (this.clientForm.valid) {
      this.isSaving = true;
      this.clientForm.disable();

      const clientData = this.clientForm.value as Client;

      const request$ = (this.isEditing && this.clientIdToEdit)
        ? this.api.updateClient(this.clientIdToEdit, clientData)
        : this.api.createClient(clientData);

        request$.subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: this.isEditing ? 'Cliente Actualizado' : 'Cliente Creado',
              showConfirmButton: false, // Se cierra solo
              timer: 1500
            });
            this.resetForm();
            this.loadClients();
            this.isSaving = false;
            this.clientForm.enable();
          },
          error: (err) =>{
            Swal.fire('Error', 'No se pudo guardar el cliente', 'error');
            this.isSaving = false;
            this.clientForm.enable();
          } 
        });
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

  onDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.isLoading = true;
        this.api.deleteClient(id).subscribe({
          next: () => {
            this.loadClients();
            Swal.fire('Eliminado', 'El cliente ha sido eliminado.', 'success');
          },
          error: () => {
            this.isLoading = false;
            Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.isEditing = false;
    this.clientIdToEdit = null;
    this.clientForm.reset();
    this.clientForm.enable();
  }

  onSearch() {
    this.loadClients();
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadClients();
  }
}