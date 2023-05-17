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
      const listTripsPreCancelled: any[] = this.tripService.getCachedpreCancelTrips();
      this.trips = data;
      this.trips.map((trip) => {
        if (listTripsPreCancelled.some((f) => f["_id"] === trip._id)) {
          trip.isPreCancel = true;
        }
        if (this.isNextTrip(trip.startDate)) {
          trip.isNext = true;
          trip.isStarted = false;
          trip.isOver = false;
        }
      });
      this.loading = false;
    });
  }

  handlePublishedTrip(tripId: string) {
    const trip = this.trips.filter((trip) => trip._id == tripId);
    trip[0].status = TripStatus.PUBLISHED;
  }

  preCancel(trip: Trip) {
    console.log(trip);
    this.tripService.savePreCancelTrip(trip);
    trip.isPreCancel = true;
  }
  
  private isNextTrip(startDate: any) {
    const timeDifference = new Date(startDate).getTime() - new Date().getTime();
    return timeDifference <= 1000 * 7 * 24 * 60 * 60;
  }
}
