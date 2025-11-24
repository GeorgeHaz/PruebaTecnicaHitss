import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs'; // <--- IMPORTANTE
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

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

  // --- FORMULARIO LOGIN ---
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // --- FORMULARIO REGISTRO ---
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
          this.isLoading = false;

          if (res.isSuccess && res.data) {
            localStorage.setItem('token', res.data);
            this.router.navigate(['/dashboard']);
          } else {
            alert('Error: ' + res.message);
          }
        },
        error: (err) =>{
          this.isLoading = false;
          alert('Error de conexión: ' + err.message);
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

          alert('Cuenta creada con éxito. Por favor, inicia sesión.');
          
          this.loginForm.patchValue({
             email: this.registerForm.value.email,
             password: '' 
          });
          
          this.registerForm.reset();
          this.selectedTabIndex.set(0); 
        },
        error: (err) =>{
          this.isLoading = false;
          alert('Error al registrar: ' + (err.error?.message || 'Intente nuevamente'));
        } 
      });
    }
  }
}