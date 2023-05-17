import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Actor } from 'src/app/models/actor.model';
import { Trip } from 'src/app/models/trip.model';
import { AuthService } from 'src/app/services/auth.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-list-favourites',
  templateUrl: './list-favourites.component.html',
  styleUrls: ['./list-favourites.component.css']
})
export class ListFavouritesComponent implements OnInit {
  trips: any[];
  protected currentActor: Actor | undefined;
  protected activeRole: string = 'anonymous';

  constructor(
    private tripService: TripService,
    private authService: AuthService) 
    {
      this.trips = [];
     }

  ngOnInit(): void {
    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor) {
      this.activeRole = this.currentActor!.role.toString().toLowerCase();
    }
    this.trips = this.tripService.getCachedFavTrips();
  }

  search(form: NgForm) {
    const query = form.value;
    const cachedTrips = this.tripService.getCachedFavTrips();
    this.trips = cachedTrips.filter((d: any) => d['title'].toLowerCase().includes(query['keyword'].toLowerCase()));
  }

  deleteFav(trip: Trip) {
    this.tripService.deleteCachedFavTrip(trip);
    this.trips = this.tripService.getCachedFavTrips();
  }
}
