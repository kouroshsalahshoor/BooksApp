import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuoteService } from '../../../services/quote-service';

@Component({
  selector: 'app-quotes-list',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './quotes-list.html',
  styleUrl: './quotes-list.css',
})
export class QuotesList implements OnInit {
  private service = inject(QuoteService);
  protected items$ = this.service.items$;

  private activatedRoute = inject(ActivatedRoute);
  protected bookId: number = 0;
  protected id: number = 0;

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    if (bookId) this.bookId = +bookId;

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) this.id = +id;

    this.service.get(this.bookId);
  }

  onDelete(bookId: number, id: number) {
    if (bookId && id) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.service.delete(bookId, id).subscribe({
          next: () => {
            this.service.get(bookId);
            // this.service.get(bookId);
          },
          error: (response) => console.log('Error deleting in list', response),
        });
      }
    }
  }
}
