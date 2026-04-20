import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {

  // Injections
  private _authService = inject(AuthService);
  private _router = inject(Router)

  public email = signal<string>('');
  public password = signal<string>('');

  protected onSubmit() {
    this._authService.login(this.email(), this.password()).subscribe({
      next: (res) => {
        this._authService.saveToken(res.token, res.user.email, res.user.id );
        this._router.navigate(['/recipes']);
      },
      error: (err) => {
        alert('Login Incorrecto');
      }
    })
  }

}
