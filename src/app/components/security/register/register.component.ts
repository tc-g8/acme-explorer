import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  roleList: string[]

  constructor(private authService: AuthService) { 
    this.roleList = this.authService.getRoles();
  }

  ngOnInit(): void {
    this.onRegister();
  }

  onRegister() {
    const actor: Actor = new Actor();
    actor.name = "Juan";
    actor.surname = "Garcia";
    actor.email = "juangarcia@gmail.com";
    actor.password = "Juan_12345";
    actor.role = "ADMINISTRATOR";
  
    this.authService.registerUser(actor)
    .then( res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}
