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
      this.loading = false;
    });
  }

  handlePublishedTrip(tripId: string) {
    const trip = this.trips.filter((trip) => trip._id == tripId);
    trip[0].status = TripStatus.PUBLISHED;
  }
}
