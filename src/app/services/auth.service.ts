import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginStatus = new Subject<Boolean>();
  currentActor: Actor | undefined;

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) { }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const url = `${environment.backendApiBaseURL + '/api/v2/actors'}`;
      const body = JSON.stringify(actor);
      let result: Actor;
      this.http
        .post(url, body, httpOptions)
        .toPromise()
        .then((res) => {
          result = res as Actor;
          this.fireAuth
            .createUserWithEmailAndPassword(actor.email, actor.password)
            .then(
              (res) => {
                resolve(result);
              },
              (err) => {
                reject(err);
              }
            );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      const url = `${environment.backendApiBaseURL + '/api/v1/actors/login'}`;
      const body = JSON.stringify({ email: email, password: password });
      let actor: Actor;

      this.http
        .post<Actor>(url, body, httpOptions)
        .toPromise()
        .then((res) => {
          actor = res as Actor;
          this.fireAuth
            .signInWithCustomToken(actor.customToken as string)
            .then(async (_) => {
              const idToken = await this.fireAuth.currentUser;
              actor.idToken = await idToken?.getIdToken();
              this.setCurrentActor(actor);
              this.loginStatus.next(true);
              this.currentActor = actor;
              resolve(actor);
            })
            .catch((error) => {
              reject(
                new Error(
                  'Something bad happened with Firebase credential token'
                )
              );
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signOut()
        .then(_ => {
          localStorage.clear();
          this.loginStatus.next(false);
          resolve('Logout succesful');
        }).catch(error => {
          reject(error);
        });
    });
  }

  setCurrentActor(actor: Actor) {
    localStorage.setItem('currentActor', JSON.stringify({ actor: actor }));
  }

  getCurrentActor(): Actor | undefined {
      const currentActor = localStorage.getItem('currentActor');
      if (currentActor) {
        return JSON.parse(currentActor).actor;
      } else {
        return undefined;
      }
  }

  getStatus(): Observable<Boolean> {
    return this.loginStatus.asObservable();
  }

  getRoles(): string[] {
    return ['EXPLORER', 'MANAGER', 'SPONSOR', 'ADMINISTRATOR'];
  }
}
