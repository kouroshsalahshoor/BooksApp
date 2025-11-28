import { Component, inject } from '@angular/core';
import { AccountService } from '../../../services/account-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private service = inject(AccountService);

  protected model: any = {};

  onSubmit() {
    console.log(this.model);

    this.service.login(this.model).subscribe({
      next: (result) => console.log(result),
      error: (error) => alert(error.message),
    });
  }
}
