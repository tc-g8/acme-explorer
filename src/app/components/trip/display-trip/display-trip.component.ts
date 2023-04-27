import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sponsorship } from 'src/app/models/sponsorship.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';
import { AuthService } from 'src/app/services/auth.service';
import { Actor } from 'src/app/models/actor.model';


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

  constructor(
    private tripService: TripService,
    private authService: AuthService,
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
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.tripService.getTrip(this.id).subscribe((trip) => {
      this.trip = trip;
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

}
