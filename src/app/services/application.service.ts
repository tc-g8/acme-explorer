import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsUrl = environment.backendApiBaseURL + '/api/v2/applications';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getApplicationsByExplorer(explorerId: string) {
    const url = `${this.applicationsUrl}/explorer/${explorerId}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken', this.authService.getCurrentActor()!.idToken!
    );
    return this.http.get<Application[]>(url, httpOptions);
  }

  getApplicationsByTripId(tripId: string) {
    const url = `${this.applicationsUrl}/trip/${tripId}`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken', this.authService.getCurrentActor()!.idToken!
    );
    return this.http.get<Application[]>(url, httpOptions);
  }

  updateApplicationStatus(applicationId: string, status: string) {
    const url = `${this.applicationsUrl}/${applicationId}/change-status`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken', this.authService.getCurrentActor()!.idToken!
    );
    return this.http.patch(url, { status }, httpOptions);
  }
  
}
