import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { Datawarehouse } from 'src/app/models/datawarehouse.model';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: Datawarehouse[];
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService, 
  ) {
    this.dashboard = [];
  }

  ngOnInit(): void {
    const query = {};
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor){
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.dashboardService.getIndicators().subscribe((dashboard) => {
      console.log(dashboard)
      this.dashboard = dashboard;
    });
  }
}
