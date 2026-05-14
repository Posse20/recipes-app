import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private _apiUrl = 'http://localhost:3000';

  public userNameChanged = signal(0);

  ///////////////////////////////
  //       LOGIN SERVICES      //
  //////////////////////////////

  public login(email: string, password: string){
    return this.http.post<{ token: string, user: any }>(`${this._apiUrl}/auth/login`, {email, password})
  }

  public saveToken(userTokenSession: any){
    localStorage.setItem('token', userTokenSession.token);
    localStorage.setItem('email', userTokenSession.user.email);
    localStorage.setItem('userId', userTokenSession.user.id.toString());
    if(userTokenSession.user.firstName){
      localStorage.setItem('firstName', userTokenSession.user.firstName);
    } else {
      localStorage.removeItem('firstName');
    }

    if(userTokenSession.user.lastName){
      localStorage.setItem('lastName', userTokenSession.user.lastName);
    } else {
      localStorage.removeItem('lastName');
    }

    this.userNameChanged.update(v => v + 1);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
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
