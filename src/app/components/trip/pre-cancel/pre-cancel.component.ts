import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripStatus } from 'src/app/enums/trip.enum';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-pre-cancel',
  templateUrl: './pre-cancel.component.html',
  styleUrls: ['./pre-cancel.component.css'],
})
export class PreCancelComponent implements OnInit {
  trips: Trip[];
  id: string;
  protected currentActor: Actor | undefined;
  loading: boolean = true;

  constructor(private tripService: TripService, private route: ActivatedRoute) {
    this.trips = [];
    this.id = '0';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const trips = getPreCancelledTripsCollection();
    this.trips = trips;
    if (trips.length > 0) {
      this.trips.forEach((trip, i) => {
        if (isNextTrip(trip.startDate)) {
          this.trips[i].isNext = true;
        }
      });
      localStorage.removeItem('preCancelledTrips');
      localStorage.setItem('preCancelledTrips', JSON.stringify(this.trips));
    }
    this.loading = false;
  }

  undoPreCancelledTrip(tripId: string): void {
    let preCancelledTrips = getPreCancelledTripsCollection();
    if (preCancelledTrips.length > 0) {
      preCancelledTrips = preCancelledTrips.filter(
        (preCancelledTrip) => preCancelledTrip._id != tripId
      );
      localStorage.removeItem('preCancelledTrips');
      localStorage.setItem(
        'preCancelledTrips',
        JSON.stringify(preCancelledTrips)
      );
      this.trips = preCancelledTrips;
    }
  }

  cancelBatchOfTrips() {
    console.log('Cancelling batch of trips...');
    this.loading = true;
    this.trips.forEach((trip) => {
      if (!trip.isNext) {
        this.tripService
          .cancelTrip(trip._id, TripStatus.PRE_CANCELLED)
          .subscribe((data: any) => {
            console.log('Trip cancelled: ', data);
            this.trips = this.trips.filter((trip) => trip._id != data._id);
            if (this.trips.length == 0) {
              localStorage.removeItem('preCancelledTrips');
              this.loading = false;
            }
          });
      }
    });
  }
}

function getPreCancelledTripsCollection(): Trip[] {
  const preCancelledTrips = localStorage.getItem('preCancelledTrips');
  if (preCancelledTrips) {
    return JSON.parse(preCancelledTrips);
  }
  return [];
}

function isNextTrip(startDate: any) {
  const timeDifference = new Date(startDate).getTime() - new Date().getTime();
  return timeDifference <= 1000 * 7 * 24 * 60 * 60;
}
