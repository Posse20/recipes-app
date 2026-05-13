import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorDetail } from '../../../models/author-detail/AuthorDetail';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  public getUserProfile(): Observable<AuthorDetail>{
    return this.http.get<AuthorDetail>(`${this.apiUrl}/profile`);
  }

  public editUserProfile(userDetail: any){
    return this.http.put(`${this.apiUrl}/edit`, userDetail);
  }


  
}
