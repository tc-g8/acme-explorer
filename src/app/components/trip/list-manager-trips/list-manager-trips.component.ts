import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripStatus } from 'src/app/enums/trip.enum';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-manager-trips',
  templateUrl: './list-manager-trips.component.html',
  styleUrls: ['./list-manager-trips.component.css'],
})
export class ListManagerTripsComponent implements OnInit {
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
    this.tripService.getTripsByManager(this.id).subscribe((data: any) => {
      this.trips = data;
      this.trips.forEach((trip, i) => {
        if (isNextTrip(trip.startDate)) {
          this.trips[i].isNext = true;
        }
      });
      const preCancelledTrips = getPreCancelledTripsCollection();
      if (preCancelledTrips.length > 0) {
        this.trips.filter((trip) => {
          const preCancelledTrip = preCancelledTrips.filter(
            (preCancelledTrip) => preCancelledTrip._id == trip._id
          );
          if (preCancelledTrip.length > 0) {
            trip.status = TripStatus.PRE_CANCELLED;
          }
        });
      }
      this.loading = false;
    });
  }

  handlePublishedTrip(tripId: string) {
    const trip = this.trips.filter((trip) => trip._id == tripId);
    trip[0].status = TripStatus.PUBLISHED;
  }

  handlePreCancelledTrip(tripId: string): void {
    const preCancelledTrips = getPreCancelledTripsCollection();
    const trip = this.trips.filter((trip) => trip._id == tripId);
    trip[0].status = TripStatus.PRE_CANCELLED;
    preCancelledTrips.push(trip[0]);
    localStorage.setItem(
      'preCancelledTrips',
      JSON.stringify(preCancelledTrips)
    );
  }
}

function isNextTrip(startDate: any) {
  const timeDifference = new Date(startDate).getTime() - new Date().getTime();
  return timeDifference <= 1000 * 7 * 24 * 60 * 60;
}

function getPreCancelledTripsCollection(): Trip[] {
  const preCancelledTrips = localStorage.getItem('preCancelledTrips');
  if (preCancelledTrips) {
    return JSON.parse(preCancelledTrips);
  }
  return [];
}
