import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private tripService: TripService,
    private authService: AuthService
  ) {
    this.trips = [];
  }

  ngOnInit(): void {
    const query = {};
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.tripService.getTrips(query).subscribe((data: any) => {
      this.trips = data;
      this.trips.map((trip) => {
        if (this.isNextTrip(trip.startDate)) {
          trip.isNext = true;
        }
      });
    });
  }

  search(form: NgForm) {
    const query = form.value;
    this.tripService.getTrips(query).subscribe((data: any) => {
      this.trips = data;
      this.trips.map((trip) => {
        if (this.isNextTrip(trip.startDate)) {
          trip.isNext = true;
        }
      });
    });
  }

  private isNextTrip(startDate: any) {
    const timeDifference = new Date(startDate).getTime() - new Date().getTime();
    return timeDifference <= 1000 * 7 * 24 * 60 * 60;
  }
}
