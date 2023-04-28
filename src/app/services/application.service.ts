import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
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
    return this.http.get<Application[]>(url);
  }

  createApplication(comment: string, explorerId: string, tripId: string) {
    const url = `${this.applicationsUrl}`;

    // const explorer_id = new ObjectId(explorerId);
    // const trip_id = new ObjectId(tripId);
    httpOptions.headers = httpOptions.headers.set(
      'idToken', this.authService.getCurrentActor()!.idToken!
    );
    return this.http.post(url, { comment, explorerId, tripId }, httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  
}
