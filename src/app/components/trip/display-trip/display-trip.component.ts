import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-display-trip',
  templateUrl: './display-trip.component.html',
  styleUrls: ['./display-trip.component.css'],
})
export class DisplayTripComponent implements OnInit {
  trip: Trip;
  id: string;
  randomBanner: number;

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = '0';
    this.trip = new Trip();
    this.trip.sponsorships = [];
    this.randomBanner = 0;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.tripService.getTrip(this.id).subscribe((trip) => {
      this.trip = trip;
      console.log(this.trip.sponsorships);
      if (this.trip.sponsorships!.length > 0) {
        this.randomBanner = this.getRandomInt(this.trip.sponsorships!.length);
      }
    });
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
