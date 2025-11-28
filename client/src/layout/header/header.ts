import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected accountService = inject(AccountService);
  protected model: any = {};

  onLogin() {
    this.accountService.login(this.model).subscribe({
      next: (result) => {
        // console.log(result);
        this.model = {};
      },
      error: (result) => alert(result.message),
    });
  }

  onLogout() {
    this.accountService.logout();
  }
}
