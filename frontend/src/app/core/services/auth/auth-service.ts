import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000';

  public login(email: string, password: string){
    return this.http.post<{ token: string }>(`${this._apiUrl}/auth/login`, {email, password})
  }

  public saveToken(token: string){
    localStorage.setItem('token', token);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
  }

  public isLoggedIn() {
    return !!this.getToken();
  }
  
}
