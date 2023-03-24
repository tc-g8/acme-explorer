import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';


import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) { }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const url = `${environment.backendApiBaseURL + '/api/v2/actors'}`;
      const body = JSON.stringify(actor);
      this.http.post(url, body, httpOptions).toPromise()
        .then(_ => {
          this.fireAuth.createUserWithEmailAndPassword(actor.email, actor.password)
            .then(res => {
              resolve(res);
            }, err => {
              reject(err);
            });
        }).catch(error => {
          reject(error);
        });
    });
  }

  getRoles(): string[] {
    return ['EXPLORER', 'MANAGER', 'SPONSOR', 'ADMINISTRATOR']
  }
}
