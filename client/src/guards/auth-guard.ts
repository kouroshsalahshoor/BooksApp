import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AccountService);
  if (service.currentUser()) return true;

  alert('guarded');
  return false;
};
