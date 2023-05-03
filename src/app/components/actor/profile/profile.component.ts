import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { ActorService } from 'src/app/services/actor.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  actor: Actor;

  constructor(
    private authService: AuthService,
    private actorService: ActorService
  ) {
    this.actor = new Actor();
  }

  ngOnInit(): void {
    const curActor = this.authService.getCurrentActor();

    if (curActor) {
      const idActor = curActor._id;
      this.actorService.getActor(idActor).subscribe((data) => {
        this.actor = data;
      });
    }
  }

  handleUpdatedActor(actor: Actor) {
    this.actor = actor;
  }
}
