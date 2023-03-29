import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css'],
})
export class ListTripsComponent implements OnInit {
  trips: Trip[];
  actor: Actor;

  constructor(
    private tripService: TripService,
    private router: Router,
    private authService: AuthService
  ) {
    this.trips = [];
    this.actor = new Actor();
  }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((data: any) => (this.trips = data));
    this.actor = this.authService.getCurrentActor()!;
  }
}
