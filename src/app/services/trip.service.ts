import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sponsorship } from '../models/sponsorship.model';
import { Trip } from '../models/trip.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applications/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsUrl = environment.backendApiBaseURL + '/api/v1/trips';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTrips(query: any) {
    let finder = {};
    if (query.keyword) {
      finder = { keyword: query.keyword };
    }
    if (query.minPrice) {
      finder = { ...finder, minPrice: query.minPrice };
    }
    if (query.maxPrice) {
      finder = { ...finder, maxPrice: query.maxPrice };
    }
    if (query.minDate) {
      finder = { ...finder, minDate: query.minDate };
    }
    if (query.maxDate) {
      finder = { ...finder, maxDate: query.maxDate };
    }
    const url = `${this.tripsUrl}`;
    return this.http.get<Trip[]>(url, { params: finder });
  }

  getTrip(id: string) {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip>(url);
  }

  getTripsByManager(managerId: string) {
    const url = `${this.tripsUrl}/manager/${managerId}`;
    httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    return this.http.get<Trip[]>(url, httpOptions);
  }

  getSponsorshipsBySponsorId(sponsorId: string) {
    const url = `${this.tripsUrl}/sponsorships/sponsor/${sponsorId}`;
    return this.http.get<Sponsorship[]>(url);
  }

  getTripSponsorshipById(id: string) {
    const url = `${this.tripsUrl}/sponsorships/${id}`;
    return this.http.get<Sponsorship>(url);
  }

  createTrip(trip: Trip) {
    const url = `${this.tripsUrl}`;
    httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify(trip);
    return this.http.post(url, body, httpOptions);
  }
}
