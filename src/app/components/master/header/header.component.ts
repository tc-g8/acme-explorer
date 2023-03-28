import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.authService.getCurrentActor()
          .then(res => {
            this.currentActor = res;
            this.activeRole = this.currentActor.role.toString().toLowerCase();
          }, err => {
            this.activeRole = 'anonymous';
            this.currentActor = undefined;
          });
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = undefined;
      }
    });
  }

  logout() {
      this.authService.logout()
        .then(_ => {
        }).catch(error => {
          console.log(error);
        });
    }

}
