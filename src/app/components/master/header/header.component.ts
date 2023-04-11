import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private returnUrl!: string;
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authService.getStatus().subscribe((loggedIn) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor!.role.toString().toLowerCase();
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = undefined;
      }
    });
  }

  logout() {
    this.authService
      .logout()
      .then((_) => {
        this.router.navigateByUrl(this.returnUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
