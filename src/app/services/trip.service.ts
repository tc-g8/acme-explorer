import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private tripsUrl = environment.backendApiBaseURL + '/api/v1/trips';

  constructor(private http: HttpClient) { }

  getTrips() {
    const url = `${this.tripsUrl}`;
    return this.http.get<Trip[]>(url);
  }

}
