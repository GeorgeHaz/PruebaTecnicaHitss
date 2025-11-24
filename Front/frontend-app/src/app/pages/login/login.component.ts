import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatInputModule, 
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  selectedTabIndex = signal(0);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;

  onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.api.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.isSuccess && res.data) {
            localStorage.setItem('token', res.data);

            this.router.navigate(['/dashboard'], {
              state: { showWelcome: true}
            });
          } else {
            this.isLoading = false;
            Swal.fire('Error de acceso', res.message || 'Credenciales incorrectas', 'error');
          }
        },
        error: (err) =>{
          this.isLoading = false;
          Swal.fire('Error de acceso', err.message || 'Credenciales incorrectas', 'error');
        } 
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.api.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;

          Swal.fire({
            title: '¡Cuenta Creada!',
            text: 'Tu usuario ha sido registrado. Por favor inicia sesión.',
            icon: 'success',
            confirmButtonText: 'Entendido'
          });
          
          this.loginForm.patchValue({
             email: this.registerForm.value.email,
             password: '' 
          });
          
          this.registerForm.reset();
          this.selectedTabIndex.set(0); 
        },
        error: (err) => {
          this.isLoading = false;
          Swal.fire('Error al registrar', err.error?.message || 'Intente nuevamente', 'error');
        }
      });
    }
  }
}