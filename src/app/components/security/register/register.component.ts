import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Registration successful';
      }, err => {
        if (err.status === 422) {
          console.log('There are some errors in the data introduced');
          this.errorMessage = 'There are some errors in the data introduced';
        } else {
          console.log(err);
          this.errorMessage = 'There was an error during the registration process';
        }
        this.successMessage = '';
      });
  }
}
