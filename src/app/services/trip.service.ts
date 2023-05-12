import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sponsorship } from '../models/sponsorship.model';
import { Trip } from '../models/trip.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsUrlV1 = environment.backendApiBaseURL + '/api/v1/trips';
  private tripsUrlV2 = environment.backendApiBaseURL + '/api/v2/trips';

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
    const url = `${this.tripsUrlV1}`;
    return this.http.get<Trip[]>(url, { params: finder });
  }

  getTrip(id: string) {
    const url = `${this.tripsUrlV1}/${id}`;
    return this.http.get<Trip>(url, httpOptions);
  }

  getTripsByManager(managerId: string) {
    const url = `${this.tripsUrlV2}/manager/${managerId}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    return this.http.get<Trip[]>(url, httpOptions);
  }

  getSponsorshipsBySponsorId(sponsorId: string) {
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    const url = `${this.tripsUrlV1}/sponsorships/sponsor/${sponsorId}`;
    return this.http.get<Sponsorship[]>(url);
  }

  getTripSponsorshipById(id: string) {
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    const url = `${this.tripsUrlV1}/sponsorships/${id}`;
    return this.http.get<Sponsorship>(url);
  }

  cancelTrip(tripId: string, cancelationReason: string) {
    const url = `${this.tripsUrlV2}/${tripId}/cancel`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    return this.http.patch<any>(url, { cancelationReason }, httpOptions);
  }

  createTrip(trip: any) {
    const url = `${this.tripsUrlV2}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify(trip);

    return this.http.post<any>(url, body, httpOptions);
  }

  updateTrip(trip: any) {
    const url = `${this.tripsUrlV2}/${trip._id}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify(trip);

    return this.http.put<any>(url, body, httpOptions);
  }

  createSponsorship(sponsorship: any, tripId: string) {
    const url = `${this.tripsUrlV2}/${tripId}/sponsorships`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify(sponsorship);

    return this.http.put<any>(url, body, httpOptions);
  }

  updateSponsorship(tripId: string, sponsorshipId: string, sponsorship: any) {
    const url = `${this.tripsUrlV2}/${tripId}/sponsorships/${sponsorshipId}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    const body = JSON.stringify(sponsorship);

    return this.http.put<any>(
      url,
      { banner: sponsorship.banner, landingPage: sponsorship.landingPage },
      httpOptions
    );
  }

  cancelSponsorship(tripId: string, sponsorshipId: string) {
    const url = `${this.tripsUrlV2}/${tripId}/sponsorships/${sponsorshipId}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );

    return this.http.patch<any>(url, {}, httpOptions);
  }

  getCachedTrips(queryHash: string): Trip[] | undefined {
    const cachedTripsRaw = localStorage.getItem(queryHash);
    if (cachedTripsRaw) {
      const cachedTripsParsed = JSON.parse(cachedTripsRaw) as any;
      const currentDateInMs = new Date().getTime();
      const diff = currentDateInMs - cachedTripsParsed.date;

      if (diff < cachedTripsParsed.duration) {
        this.saveTripsInCache(queryHash, cachedTripsParsed);
        return cachedTripsParsed.trips;
      } else {
        localStorage.removeItem(queryHash);
      }
    }
    return undefined;
  }

  saveTripsInCache(queryHash: any, cachedTrips: any) {
    const newCachedTrips = { ...cachedTrips, date: new Date().getTime() };
    localStorage.setItem(queryHash, JSON.stringify(newCachedTrips));
  }
}
