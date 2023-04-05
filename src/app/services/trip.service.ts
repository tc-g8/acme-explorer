import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private tripsUrl = environment.backendApiBaseURL + '/api/v1/trips';

  constructor(private http: HttpClient) { }

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
}
