import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { Datawarehouse } from 'src/app/models/datawarehouse.model';
import { Role } from 'src/app/enums/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ActorService } from 'src/app/services/actor.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import Chart from 'chart.js/auto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboard: Datawarehouse[];
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';
  protected ratioApplicationsByStatus: any;
  protected topSearchedKeyWords: any;
  actors: Actor[];
  amountSpentByExplorer: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private actorService: ActorService
  ) {
    this.dashboard = [];
    this.actors = [];
  }

  ngOnInit(): void {
    const query = {};
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.dashboardService.getIndicators().subscribe((dashboard) => {
      this.dashboard = dashboard;
      this.getRatioApplicationsByStatus(dashboard);
      this.getTopSearchedKeyWords(dashboard);
    });
    this.actorService.getActors().subscribe((actors) => {
      actors.forEach((actor) => {
        if (actor.role == Role.EXPLORER) {
          this.actors.push(actor);
        }
      });
    });
  }

  getRatioApplicationsByStatus(dashboard: Datawarehouse[]) {
    const labels = new Array();
    const data = new Array();
    dashboard[0].ratioApplicationsByStatus.forEach((dict) => {
      labels.push(dict._id);
      data.push(dict.applications);
    });
    this.ratioApplicationsByStatus = new Chart('ratioApplicationsByStatus', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: $localize`Ratio applications by status`,
            data,
            backgroundColor: [
              'rgba(112, 206, 174, 0.4)',
              'rgba(255, 92, 98, 0.4)',
              'rgba(214, 234, 232, 0.4)',
              'rgba(29, 166, 188, 0.4)',
            ],
            borderColor: [
              'rgba(112, 206, 174)',
              'rgba(255, 92, 98)',
              'rgba(214, 234, 232)',
              'rgba(29, 166, 188)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  getTopSearchedKeyWords(dashboard: Datawarehouse[]) {
    const labels = new Array();
    const data = new Array();
    dashboard[0].topSearchedKeywords.forEach((dict) => {
      labels.push(dict._id);
      data.push(dict.totalSearch);
    });
    this.topSearchedKeyWords = new Chart('topSearchedKeyWords', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: $localize`Number of searches`,
            data,
            backgroundColor: ['rgba(29, 166, 188, 0.4)'],
            borderColor: ['rgba(29, 166, 188)'],
            borderWidth: 1,
          },
        ],
      },
    });
  }

  getAmountSpentByExplorer(form: NgForm) {
    const explorerId = form.value.explorer;
    const cubeParam = form.value.cubeParam;
    this.dashboardService
      .getAmoutSpentByExplorer(explorerId, cubeParam)
      .subscribe((res) => {
        this.amountSpentByExplorer = res.amount;
      });
  }

  getExplorersByAmountSpent(form: NgForm) {}
}
