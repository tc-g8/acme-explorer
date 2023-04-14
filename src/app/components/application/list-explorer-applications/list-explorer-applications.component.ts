import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Application } from 'src/app/models/application.model';
import { ApplicationService } from 'src/app/services/application.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-explorer-applications',
  templateUrl: './list-explorer-applications.component.html',
  styleUrls: ['./list-explorer-applications.component.css']
})
export class ListExplorerApplicationsComponent implements OnInit {
  applications: Application[];
  id: string;
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.applications = [];
    this.id = '0';
  }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.id = this.route.snapshot.params['explorerId'];
    this.applicationService.getApplicationsByExplorer(this.id).subscribe((data: any) => {
      data.forEach((element: any) => {
        this.applications = [...this.applications, ...element.applications]
      });
    });
  }

}
