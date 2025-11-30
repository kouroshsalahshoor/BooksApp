import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Book } from '../types/book';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private accountService = inject(AccountService);
  private apiUrl = environment.apiUrl + 'books';

  get() {
    return this.http.get<Book[]>(this.apiUrl);
    // return this.http.get<Book[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number) {
    return this.http.get<Book>(this.apiUrl + '/' + id);
    // return this.http.get<Book>(this.apiUrl + '/' + id, this.getHttpOptions());
  }

  // getHttpOptions() {
  //   return {
  //     headers: {
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     },
  //   };
  // }
}
