import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../layout/footer/footer';
import { Header } from '../layout/header/header';
import { AccountService } from '../services/account-service';
import { UserModel } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  protected readonly title = signal('Books App');
  protected users = signal<UserModel[]>([]);

  async ngOnInit() {
    this.setCurrentUser();
    this.users.set(await this.getUsers());
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  // ngOnInit(): void {
  // this.http.get('https://localhost:7000/api/users').subscribe({
  //   next: (response) => {
  //     console.log(response);
  //     return this.users.set(response);
  //   },
  //   error: (error) => console.error(error),
  //   complete: () => console.log('Completed http request'),
  // });
  // }

  async getUsers() {
    try {
      return lastValueFrom(this.http.get<UserModel[]>('https://localhost:7000/api/users'));
    } catch (error) {
      console.log(error);
      throw error;
      // return []; // Return an empty array or a default value in case of an error
    }
  }
}
