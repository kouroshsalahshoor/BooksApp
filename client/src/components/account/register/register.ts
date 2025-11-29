import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerModel } from '../../../types/registerModel';
import { AccountService } from '../../../services/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private service = inject(AccountService);
  private router = inject(Router);
  protected model = {} as registerModel;

  onSubmit() {
    // console.log(this.model);
    this.service.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (response) => console.log(response),
      // complete:() =>
    });
  }

  cancel() {
    console.log('cancelled');
    this.router.navigate(['/']);
  }
}
