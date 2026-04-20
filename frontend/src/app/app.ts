import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected userEmail = signal<string>('');

  constructor(){
    this.userEmail.set(localStorage.getItem('email') ?? '');
  }

  isLoginPage() {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
