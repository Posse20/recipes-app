import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000';

  ///////////////////////////////
  //       LOGIN SERVICES      //
  //////////////////////////////

  public login(email: string, password: string){
    return this.http.post<{ token: string, user: any }>(`${this._apiUrl}/auth/login`, {email, password})
  }

  public saveToken(token: string, email: string, userId: number){
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId.toString());
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

    ///////////////////////////////
    //     REGISTER SERVICES     //
    //////////////////////////////

    public register(body: {email: string, password: string}){
      return this.http.post(`${this._apiUrl}/auth/register`, body);
    }
  
}
