import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../types/user';
import { tap } from 'rxjs';
import { loginModel } from '../types/loginModel';
import { registerModel } from '../types/registerModel';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<UserModel | null>(null);

  private baseUrl = environment.apiUrl + 'account/';

  register(model: registerModel) {
    return this.http.post<UserModel>(this.baseUrl + 'register', model).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  private setCurrentUser(user: UserModel) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    // console.log('set currentuser:' + JSON.stringify(user));
  }

  login(model: loginModel) {
    return this.http.post<UserModel>(this.baseUrl + 'login', model).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
