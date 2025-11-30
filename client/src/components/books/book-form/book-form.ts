import { Component, inject, model, OnInit, signal } from '@angular/core';
import { BookService } from '../../../services/book-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookCreateUpdateModel } from '../../../types/book';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  private service = inject(BookService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private fb = inject(FormBuilder);
  protected fg: FormGroup;
  protected id: number = 0;
  // protected model = signal<BookCreateUpdateModel | undefined>(undefined);

  constructor() {
    this.fg = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
    });

    this.fg.patchValue({ publishedDate: '2025-11-11' });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.id = +id;

      this.service.getById(this.id).subscribe({
        next: (response) => {
          this.fg.patchValue({
            id: response.id,
            title: response.title,
            author: response.author,
            publishedDate: response.publishedDate,
          });
        },
        error: (response) => console.log('Error loading book form', response),
      });
    }
  }

  onSubmit() {
    if (this.fg.valid) {
      const formValue = this.fg.value;
      console.log(formValue);

      const model: BookCreateUpdateModel = {
        id: 0,
        title: formValue.title,
        author: formValue.author,
        publishedDate: formValue.publishedDate,
      };

      if (this.id > 0) {
        model.id = this.id;

        this.service.update(this.id, model).subscribe({
          next: () => this.router.navigate(['/books']),
          error: (response) => console.log('Error updating book in form', response),
        });
      } else {
        this.service.create(model).subscribe({
          next: () => this.router.navigate(['/books']),
          error: (response) => console.log('Error creating book in form', response),
        });
      }
    }
  }
}
