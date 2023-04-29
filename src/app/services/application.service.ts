import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private applicationsUrl =
    environment.backendApiBaseURL + '/api/v1/applications';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getApplicationsByExplorer(explorerId: string) {
    const url = `${this.applicationsUrl}/explorer/${explorerId}`;
    return this.http.get<Application[]>(url);
  }

  getApplicationsByTripId(tripId: string) {
    const url = `${this.applicationsUrl}/trip/${tripId}`;
    return this.http.get<Application[]>(url);
  }

  payApplication(applicationId: string) {
    const url = `${this.applicationsUrl}/trip/${applicationId}/pay`;
    httpOptions.headers = httpOptions.headers.set(
      'idToken',
      this.authService.getCurrentActor()!.idToken!
    );
    return this.http.post<Application[]>(url, httpOptions);
  }
}
