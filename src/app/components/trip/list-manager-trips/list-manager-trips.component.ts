import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private tripService: TripService, private route: ActivatedRoute) {
    this.trips = [];
    this.id = '0';
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['managerId'];
    this.tripService
      .getTripsByManager(this.id)
      .subscribe((data: any) => (this.trips = data));
    console.log(this.trips);
  }
}
