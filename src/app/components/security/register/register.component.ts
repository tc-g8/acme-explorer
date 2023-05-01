import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';

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
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      address: [''],
      password: ['', Validators.required],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
  }

  onRegister() {
    console.log(this.registrationForm.value)
    if (this.activeRole === 'administrator') {
      this.registrationForm.value.role = [this.registrationForm.value.role]
    }
    this.authService.registerUser(this.registrationForm.value).then(
      (res) => {
        this.errorMessage = '';
        this.successMessage = $localize`Registration successful`;
        this.messageService.notifyMessage(
          this.successMessage,
          'alert alert-success'
        );
      },
      (err) => {
        if (err.status === 422) {
          console.log(err.error.errors);
          this.errorMessage = $localize`There are some errors in the data introduced:
          ${err.error.errors.map((error: any) => error.param).join(', ')}`;
        } else {
          console.log(err);
          if(err.error.err.code == 11000) {
            this.errorMessage = $localize`The email introduced is already registered`;
          } else if (err.error.err.errors.email) {
            this.errorMessage = $localize`The email introduced is invalid`;
          } else {
            this.errorMessage = $localize`There was an error during the registration process`;
          }
        }
        this.messageService.notifyMessage(
          this.errorMessage,
          'alert alert-danger'
        );
        this.successMessage = '';
      }
    );
  }

  get name() {
    return this.registrationForm.get('name');
  }
  get surname() {
    return this.registrationForm.get('surname');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
}
