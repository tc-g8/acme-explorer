import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-pre-cancelled',
  templateUrl: './list-pre-cancelled.component.html',
  styleUrls: ['./list-pre-cancelled.component.css']
})
export class ListPreCancelledComponent implements OnInit {
  trips: Trip[];
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';
  loading: boolean = true;

  constructor(
    private tripService: TripService,
    private authService: AuthService
    ) {
      this.trips = [];
     }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.trips = this.tripService.getCachedpreCancelTrips();
    this.trips.map((trip) => {
      if (this.isNextTrip(trip.startDate)) {
        trip.isNext = true;
        trip.isStarted = false;
        trip.isOver = false;
      }
    });
    this.loading = false;
  }

  deletePreCancelledTrip(trip: Trip) {
    this.tripService.deleteCachedPreCancelTrip(trip);
    this.trips = this.tripService.getCachedpreCancelTrips();
  }

  cancelAllPreCancelledTrips(trips: Trip[]) {
    this.tripService.deleteAllCachedPreCancelTrips(trips);
    this.trips = this.tripService.getCachedpreCancelTrips();
  }

  private isNextTrip(startDate: any) {
    const timeDifference = new Date(startDate).getTime() - new Date().getTime();
    return timeDifference <= 1000 * 7 * 24 * 60 * 60;
  }

}
