import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private auth = inject(AuthService);
  private router = inject(Router);

  protected nickName = signal<string>('');

  constructor(){
    this._buildNameToShow();
    effect(() => {
      this.auth.userNameChanged();
      this._buildNameToShow();
    })
  }

  private _buildNameToShow(){
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    if(firstName && lastName){
      this.nickName.set(`${firstName} ${lastName}`);
    }else{
      this.nickName.set(email ?? '');
    }

  }

  isLoginPage() {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
