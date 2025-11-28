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
  private accountService = inject(AccountService);
  protected model: any = {};
  protected isLoggedIn = signal(false);

  onLogin() {
    this.accountService.login(this.model).subscribe({
      next: (result) => {
        // console.log(result);
        this.isLoggedIn.set(true);
        this.model = {};
      },
      error: (result) => alert(result.message),
    });
  }

  onLogout() {
    this.isLoggedIn.set(false);
  }
}
