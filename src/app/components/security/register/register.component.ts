import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[]

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.roleList = this.authService.getRoles();
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: [''],
      role: ['']
    });
  }
  
  ngOnInit(): void {
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        console.log(res);
      }, err => {
        if (err.status === 422) {
          console.log('There are some errors in the data introduced');
        }
        console.log(err);
      })
  }

}
