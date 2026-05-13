import { Component, inject, OnInit, signal } from '@angular/core';
import { UserProfileService } from '../../../../core/services/user-profile/user-profile';
import { AuthorDetail } from '../../../../models/author-detail/AuthorDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfileComponent implements OnInit {

  private _userDetailService = inject(UserProfileService);
  private _router = inject(Router);

  protected userDetail = signal<AuthorDetail | null>(null);
  protected showEditModalProfile = signal<boolean>(false);
  protected firstNameInput = signal<string>('');
  protected lastNameInput = signal<string>('');
  protected emailInput = signal<string>('');

  ngOnInit(): void {
    this._initializator();
  }

  private _initializator(){
    this._userDetailService.getUserProfile().subscribe({
      next: res => {
        this.userDetail.set(res);
        this.emailInput.set(this.userDetail()?.email ?? '');
        this.firstNameInput.set(this.userDetail()?.firstName ?? '');
        this.lastNameInput.set(this.userDetail()?.lastName ?? '');
      }
    });
  }

  protected onOpenModal(){
    this.showEditModalProfile.set(true);
  }

  protected onCloseModal(){
    this.showEditModalProfile.set(false);
  }

  protected saveUserDetail(){
    const body = {
      email: this.emailInput(),
      firstName: this.firstNameInput(),
      lastName: this.lastNameInput()
    };

    this._userDetailService.editUserProfile(body).subscribe({
      next: res => {
        if(res){
          this.showEditModalProfile.set(false);
          this._initializator();
        }
      }
    })
  }

}
