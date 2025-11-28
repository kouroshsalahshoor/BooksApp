import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../layout/footer/footer';
import { Header } from '../layout/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Books App');
  protected users = signal<any>([]);

  async ngOnInit() {
    this.users.set(await this.getUsers());
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
      return lastValueFrom(this.http.get('https://localhost:7000/api/users'));
    } catch (error) {
      console.log(error);
      throw error;
      // return []; // Return an empty array or a default value in case of an error
    }
  }
}
