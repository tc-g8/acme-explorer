import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';
import { isPastDate } from 'src/app/utils/dates';
import * as objectHash from 'object-hash';

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
      let tripNumber : number = this.tripService.getCachedTripNumber();
      if (tripNumber === 0) {
        this.trips = data.slice(0, 10);
      } else {
        this.trips = data.slice(0, tripNumber);
      }
      this.trips.map((trip) => {
        if (this.isNextTrip(trip.startDate)) {
          trip.isNext = true;
          trip.isStarted = false;
          trip.isOver = false;
        }
        if (isPastDate(trip.startDate)) {
          trip.isStarted = true;
          trip.isNext = false;
          trip.isOver = false;
        }
        if (isPastDate(trip.endDate)) {
          trip.isOver = true;
          trip.isNext = false;
          trip.isStarted = false;
        }
      });
    });
  }

  search(form: NgForm) {
    const query = form.value;
    const cacheTime: number = form.value.cacheTime
      ? form.value.cacheTime > 0 && form.value.cacheTime <= 24
        ? form.value.cacheTime
        : 1
      : 1;
    query.cacheTime = cacheTime * 1000 * 60 * 60;
    const modifiedQuery = { ...query }; // Create a shallow copy of the query object
    delete modifiedQuery.tripNumber;
    const queryHash = objectHash.sha1(modifiedQuery);
    const cachedTrips = this.tripService.getCachedTrips(queryHash);

    let tripNumber : number = this.tripService.getCachedTripNumber();

    if (tripNumber === 0 || form.value.tripNumber) {
      tripNumber = form.value.tripNumber
        ? form.value.tripNumber > 10 && form.value.tripNumber <= 100
          ? form.value.tripNumber
          : 10
        : 10;
      this.tripService.saveCachedTripNumber(tripNumber);
    }

    if (cachedTrips) {
      console.log('Cached search');
      this.trips = cachedTrips.slice(0, tripNumber);
      return;
    } else {
      this.tripService.getTrips(query).subscribe((data: any) => {
        this.trips = data.slice(0, tripNumber);
        this.trips.map((trip) => {
          if (this.isNextTrip(trip.startDate)) {
            trip.isNext = true;
            trip.isStarted = false;
            trip.isOver = false;
          }
          if (isPastDate(trip.startDate)) {
            trip.isStarted = true;
            trip.isNext = false;
            trip.isOver = false;
          }
          if (isPastDate(trip.endDate)) {
            trip.isOver = true;
            trip.isNext = false;
            trip.isStarted = false;
          }
        });
        console.log('New search');
        this.tripService.saveTripsInCache(queryHash, {
          trips: this.trips,
          date: new Date().getTime(),
          duration: query.cacheTime,
        });
      });
    }
  }

  private isNextTrip(startDate: any) {
    const timeDifference = new Date(startDate).getTime() - new Date().getTime();
    return timeDifference <= 1000 * 7 * 24 * 60 * 60;
  }
}
