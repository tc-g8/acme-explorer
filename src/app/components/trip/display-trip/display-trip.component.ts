import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';
import { ApplicationService } from 'src/app/services/application.service';
import { isPastDate, isAWeekBeforeDate } from 'src/app/utils/dates';
import { ApplicationStatus } from 'src/app/enums/application.enum';
import { TripStatus } from 'src/app/enums/trip.enum';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.css'],
})
export class DisplayTripComponent implements OnInit {
  trip: Trip;
  id: string;
  randomBanner: number;
  acceptedSponsorships: Sponsorship[];
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';
  protected hasApplication: boolean = false;
  protected hasApplicationsPaid: boolean = false;
  protected tripStartSoon: boolean = false;
  showCounter: boolean;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private applicationService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.trip.stages = [];
    this.trip.requirements = [];
    this.trip.imageCollection = [];
    this.acceptedSponsorships = [];
    this.randomBanner = 0;
    this.showCounter = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.tripService.getTrip(this.id).subscribe((trip) => {
      this.trip = trip;
      if (this.activeRole === 'explorer') {
        this.applicationService
          .getApplicationsByExplorer(this.currentActor!._id)
          .subscribe((applications) => {
            if (applications.length > 0) {
              applications.forEach((element: any) => {
                element.applications.forEach((application: any) => {
                  if (application.trip_id === this.trip._id) {
                    this.hasApplication = true;
                  }
                });
              });
            }
          });
      }
      if (isPastDate(this.trip.endDate)) {
        this.showCounter = false;
        this.trip.isOver = true;
      }
      if (this.activeRole === 'manager') {
        this.applicationService
          .getApplicationsByTripId(trip._id)
          .subscribe((applications) => {
            applications.find((application) => {
              if (application.status === ApplicationStatus.ACCEPTED) {
                this.hasApplicationsPaid = true;
              }
            });
          });
        if (isAWeekBeforeDate(this.trip.startDate)) {
          this.tripStartSoon = true;
        }
      }
      if (this.trip.sponsorships!.length > 0) {
        this.acceptedSponsorships = this.trip.sponsorships!.filter(
          (sponsorship) => sponsorship.status === 'ACCEPTED'
        );
        this.randomBanner = this.getRandomBanner(
          this.acceptedSponsorships.length
        );
      }
    });
  }

  private getRandomBanner(max: number): number {
    return Math.floor(Math.random() * max);
  }

  handleCreatedApplication(event: boolean) {
    this.hasApplication = event;
  }

  handleCanceledTrip(cancelationReason: string) {
    this.trip.cancelationReason = cancelationReason;
    this.trip.status = TripStatus.CANCELLED;
  }
}
