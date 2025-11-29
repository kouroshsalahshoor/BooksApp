import { Routes } from '@angular/router';
import { Login } from '../components/account/login/login';
import { Register } from '../components/account/register/register';
import { BooksList } from '../components/books/books-list/books-list';
import { BookForm } from '../components/books/book-form/book-form';
import { QuotesList } from '../components/quotes/quotes-list/quotes-list';
import { QuoteForm } from '../components/quotes/quote-form/quote-form';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: '', component: BooksList, pathMatch: 'full' },
  { path: 'books', component: BooksList },
  { path: 'book/add', component: BookForm },
  { path: 'book/edit/:id', component: BookForm },

  { path: 'quotes', component: QuotesList },
  { path: 'quote/add', component: QuoteForm },
  { path: 'quote/edit/:id', component: QuoteForm },

  // { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
