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
  // private accountService = inject(AccountService);
  private apiUrl = environment.apiUrl + 'books';

  get() {
    return this.http.get<Book[]>(this.apiUrl);
    // return this.http.get<Book[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number) {
    return this.http.get<Book>(this.apiUrl + '/' + id);
    // return this.http.get<Book>(this.apiUrl + '/' + id, this.getHttpOptions());
  }

  create(model: Book) {
    console.log('book service post: ', model);
    return this.http.post(this.apiUrl, model);
  }

  update(id: number, model: Book) {
    return this.http.put(this.apiUrl + '/' + id, model);
  }

  delete(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  // getHttpOptions() {
  //   return {
  //     headers: {
  //       Authorization: 'Bearer ' + this.accountService.currentUser()?.token,
  //     },
  //   };
  // }
}
