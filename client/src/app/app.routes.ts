import { Routes } from '@angular/router';
import { Login } from '../components/account/login/login';
import { Register } from '../components/account/register/register';
import { BooksList } from '../components/books/books-list/books-list';
import { BookForm } from '../components/books/book-form/book-form';
import { QuotesList } from '../components/quotes/quotes-list/quotes-list';
import { QuoteForm } from '../components/quotes/quote-form/quote-form';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  { path: '', component: BooksList, pathMatch: 'full' },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'book/add', component: BookForm },
      { path: 'book/edit/:id', component: BookForm },

      { path: 'quotes/:bookId', component: QuotesList },
      { path: 'quote/add/:bookId', component: QuoteForm },
      { path: 'quote/edit/:bookId/:id', component: QuoteForm },
    ],
  },

  { path: 'books', component: BooksList },
  { path: 'quotes/favorites', component: QuotesList },
  // { path: 'book/add', component: BookForm, canActivate: [authGuard] },
  // { path: 'book/edit/:id', component: BookForm, canActivate: [authGuard] },

  // { path: 'quotes', component: QuotesList, canActivate: [authGuard] },
  // { path: 'quote/add', component: QuoteForm, canActivate: [authGuard] },
  // { path: 'quote/edit/:id', component: QuoteForm, canActivate: [authGuard] },

  // { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
