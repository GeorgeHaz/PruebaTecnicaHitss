import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header><mat-card-title>Crear Cuenta Nueva</mat-card-title></mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <p>
              <mat-form-field class="w-100">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" placeholder="nuevo@ejemplo.com">
              </mat-form-field>
            </p>
            <p>
              <mat-form-field class="w-100">
                <mat-label>Contraseña</mat-label>
                <input matInput type="password" formControlName="password">
              </mat-form-field>
            </p>
            <div class="actions">
              <button mat-raised-button color="accent" type="submit" [disabled]="form.invalid">Registrarse</button>
              <a mat-button routerLink="/login">Volver al Login</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.container { height: 100vh; display: flex; justify-content: center; align-items: center; background: #eee; } mat-card { width: 350px; padding: 20px; } .w-100 { width: 100%; } .actions { display: flex; justify-content: space-between; margin-top: 10px; }`]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.valid) {
      this.api.register(this.form.value).subscribe({
        next: () => {
          alert('Usuario registrado con éxito. Ahora inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => alert('Error al registrar: ' + (err.error?.message || err.message))
      });
    }
  }
}