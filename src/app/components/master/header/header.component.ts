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
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor!.role.toString().toLowerCase();
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = undefined;
      }
    });
  }

  changeLanguage(language: string) {
    localStorage.setItem('locale', language);
    location.reload();
  }

  logout() {
    this.authService.logout()
      .then(_ => {
      }).catch(error => {
        console.log(error);
      });
  }

}
