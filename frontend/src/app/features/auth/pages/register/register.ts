import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  // Injections
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public email = signal<string>('');
  public password = signal<string>('');

  protected onSubmit(){
    const body = {
      email: this.email(),
      password: this.password()
    };

    this._authService.register(body).subscribe({
      next: (res) => {
        this._router.navigate(['/login']);
      },
      error: (err) => {
        console.error('erroooor', err);
      }
    })
  }

}
