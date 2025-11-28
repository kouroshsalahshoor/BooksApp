import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserModel } from '../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<UserModel | null>(null);

  baseUrl = 'https://localhost:7000/api/account/';

  login(model: any) {
    return this.http.post<UserModel>(this.baseUrl + 'login', model).pipe(
      tap((user: UserModel) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
