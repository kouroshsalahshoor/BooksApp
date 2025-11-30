import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/book-service';
import { Observable } from 'rxjs';
import { Book } from '../../../types/book';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css',
})
export class BooksList {
  private service = inject(BookService);
  protected items$: Observable<Book[]>;

  constructor() {
    this.items$ = this.service.get();
  }

  onDelete() {}
}
