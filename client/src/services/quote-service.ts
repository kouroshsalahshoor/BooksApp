import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { QuoteCreateUpdateModel, QuoteModel } from '../types/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'book/';

  private itemsSubject = new BehaviorSubject<QuoteModel[]>([]);
  items$ = this.itemsSubject.asObservable();

  get(bookId: number) {
    return this.http.get<QuoteModel[]>(this.apiUrl + bookId + '/quotes').subscribe((items) => {
      this.itemsSubject.next(items);
    });
  }

  getById(bookId: number, id: number) {
    return this.http.get<QuoteModel>(this.apiUrl + bookId + '/quotes/' + id);
  }

  create(bookId: number, model: QuoteCreateUpdateModel) {
    return this.http.post(this.apiUrl + bookId + '/quotes/', model);
  }

  update(bookId: number, id: number, model: QuoteCreateUpdateModel) {
    return this.http.put(this.apiUrl + bookId + '/quotes/' + id, model);
  }

  delete(bookId: number, id: number) {
    return this.http
      .delete(this.apiUrl + bookId + '/quotes/' + id)
      .pipe(tap(() => this.get(bookId)));
  }
}
