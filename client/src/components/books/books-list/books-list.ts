import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/book-service';
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
  protected items$ = this.service.items$;

  constructor() {
    this.service.get();
  }

  onDelete(id: number) {
    if (id) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.service.delete(id).subscribe({
          next: () => {
            this.service.get();
          },
          error: (response) => console.log('Error deleting book in list', response),
        });
      }
    }
  }
}
