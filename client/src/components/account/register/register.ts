import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerModel } from '../../../types/registerModel';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected model = {} as registerModel;

  onSubmit() {
    console.log(this.model);
  }

  cancel() {
    console.log('canceled');
  }
}
