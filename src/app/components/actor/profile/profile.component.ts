import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  actor: Actor;

  constructor(private authService: AuthService) {
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.actor = this.authService.getCurrentActor()!;
  }
}
