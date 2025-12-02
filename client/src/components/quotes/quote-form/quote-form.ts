import { Component, inject, OnInit } from '@angular/core';
import { QuoteService } from '../../../services/quote-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteCreateUpdateModel } from '../../../types/quote';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.css',
})
export class QuoteForm implements OnInit {
  private service = inject(QuoteService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private fb = inject(FormBuilder);
  protected fg: FormGroup;
  protected id: number = 0;
  protected bookId: number = 0;

  constructor() {
    this.fg = this.fb.group({
      text: ['', Validators.required],
      pageNumber: ['', Validators.required],
      rowNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    if (bookId) this.bookId = +bookId;

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;

      this.service.getById(this.bookId, this.id).subscribe({
        next: (response) => {
          this.fg.patchValue({
            id: response.id,
            text: response.text,
            pageNumber: response.pageNumber,
            rowNumber: response.rowNumber,
          });
        },
        error: (response) => console.log('Error loading form', response),
      });
    }
  }

  onSubmit() {
    if (this.fg.valid) {
      const formValue = this.fg.value;
      console.log(formValue);

      const model: QuoteCreateUpdateModel = {
        id: 0,
        text: formValue.text,
        pageNumber: formValue.pageNumber,
        rowNumber: formValue.rowNumber,
        bookId: this.bookId,
      };

      if (this.id > 0) {
        model.id = this.id;

        this.service.update(this.bookId, this.id, model).subscribe({
          next: () => this.router.navigate(['/quotes/' + this.bookId]),
          error: (response) => console.log('Error updating in form', response),
        });
      } else {
        this.service.create(this.bookId, model).subscribe({
          next: () => this.router.navigate(['/quotes/' + this.bookId]),
          error: (response) => console.log('Error creating in form', response),
        });
      }
    }
  }
}
