import { Routes } from '@angular/router';
import { Login } from '../components/account/login/login';
import { Register } from '../components/account/register/register';
import { List } from '../components/book/list/list';
import { Form } from '../components/book/form/form';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'books', component: List },
  { path: 'book/add', component: Form },
  { path: 'book/edit/:id', component: Form },
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books' },
];
