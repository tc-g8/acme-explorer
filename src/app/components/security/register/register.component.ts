import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  onRegister() {
    this.authService.registerUser(this.registrationForm.value).then(
      (res) => {
        this.errorMessage = '';
        this.successMessage = 'Registration successful';
        this.messageService.notifyMessage(
          this.successMessage,
          'alert alert-success'
        );
      },
      (err) => {
        if (err.status === 422) {
          this.errorMessage = 'There are some errors in the data introduced';
          console.log(this.errorMessage);
        } else {
          console.log(err);
          this.errorMessage =
            'There was an error during the registration process';
        }
        this.messageService.notifyMessage(
          this.errorMessage,
          'alert alert-danger'
        );
        this.successMessage = '';
      }
    );
  }
}
