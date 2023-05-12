import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  private actorsUrl = environment.backendApiBaseURL + '/api/v1/actors';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getActor(id: string) {
    const url = `${this.actorsUrl}/${id}`;
    return this.http.get<Actor>(url);
  }

  getActors() {
    return this.http.get<Actor[]>(this.actorsUrl);
  }

  updateProfile(actor: Actor) {
    const url = `${this.actorsUrl}/${actor._id}`;
    httpOptions.headers.set(
      'Authorization',
      this.authService.getCurrentActor()!.customToken!
    );

    const body = JSON.stringify(actor);
    return this.http
      .put(url, body, httpOptions)
      .pipe(retry(3), catchError(this.handleError));
  }

  updatePassword(id: string, password: string) {
    const url = `${this.actorsUrl}/${id}/update-password`;
    httpOptions.headers.set(
      'Authorization',
      this.authService.getCurrentActor()!.customToken!
    );

    const body = JSON.stringify({ password });
    return this.http
      .patch(url, body, httpOptions)
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
