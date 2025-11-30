import { Component, inject, model } from '@angular/core';
import { BookService } from '../../../services/book-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../../types/book';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm {
  private service = inject(BookService);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  protected fg: FormGroup;

  // protected item$: Observable<Book>;

  constructor() {
    this.fg = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
    });

    this.fg.patchValue({ publishedDate: '2025-11-11' });
  }

  onSubmit() {
    if (this.fg.valid) {
      const formValue = this.fg.value;
      console.log(formValue);

      const model: Book = {
        id: 0,
        title: formValue.title,
        author: formValue.author,
        publishedDate: formValue.publishedDate,
        createdAt: '',
        createdBy: 'xxx',
        updatedAt: '',
        updatedBy: 'xxx',
        quotes: [],
      };

      this.service.create(model).subscribe((result) => {
        this.router.navigate(['/books']);
      });
    }
  }
}
