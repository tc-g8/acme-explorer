import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.css'],
})
export class ListApplicationsComponent implements OnInit {
  applications: Application[];
  explorerId: string;
  tripId: string;
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.applications = [];
    this.explorerId = '0';
    this.tripId = '0';
  }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.explorerId = this.route.snapshot.params['explorerId'];
    if (this.explorerId) {
      this.applicationService
        .getApplicationsByExplorer(this.explorerId)
        .subscribe((data: any) => {
          data.forEach((element: any) => {
            this.applications = [...this.applications, ...element.applications];
          });
        });
    }
    this.tripId = this.route.snapshot.params['tripId'];
    if (this.tripId) {
      this.applicationService
        .getApplicationsByTripId(this.tripId)
        .subscribe((data: any) => {
          this.applications = data;
        });
    }
  }
}
