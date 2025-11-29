import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected accountService = inject(AccountService);
  protected router = inject(Router);

  protected model: any = {};
  protected title=signal('Book Quotes App')

  onLogin() {
    this.accountService.login(this.model).subscribe({
      next: (result) => {
        // console.log(result);
        this.model = {};
        this.router.navigateByUrl('/');
      },
      error: (result) => alert(result.message),
    });
  }

  onLogout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
