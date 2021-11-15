import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { first, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { CreateUser, DeleteUser, GetUsers, GetUsersSuccess, UpdateUser, UserActionTypes } from '../store/user/user.action';
import { UserState } from '../store/user/user.reducer';
import { ApiUser } from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  public getDataAPI(): Observable<UserState>
  {
    this.store.dispatch(new GetUsers());
    this.http.get<ApiUser>(environment.api)
    .pipe(first())
    .subscribe(data => this.store.dispatch(new GetUsersSuccess(data.results[0].users)));

    return this.store.select('users');
  }

  public createNewUser(user: User)
  {
    this.store.dispatch(new CreateUser(user));
  }

  public deleteUser(index: number)
  {
    this.store.dispatch(new DeleteUser(index));
  }

  public updateUser(user: User, index: number)
  {
    this.store.dispatch(new UpdateUser({user: user, index: index}));
  }
}
