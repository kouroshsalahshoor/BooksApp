import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  protected accountService = inject(AccountService);
  protected router = inject(Router);

  protected model: any = {};
  protected title = signal('Book Quotes App (Angular 20)');
  protected selectedTheme = signal(localStorage.getItem('theme') || 'light');

  ngOnInit(): void {
    document.documentElement.setAttribute('data-bs-theme', this.selectedTheme());
  }

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

  toggleTheme() {
    const newTheme = this.selectedTheme() === 'light' ? 'dark' : 'light';
    this.selectedTheme.set(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
  }
}
