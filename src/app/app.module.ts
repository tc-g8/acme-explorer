import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire/compat';
import { RegisterComponent } from './components/security/register/register.component';

export const firebaseConfig = {
  apiKey: "AIzaSyB4KZiJ04_eH_nAQadct84F-h8zQYuZ8J8",
  authDomain: "acme-explorer-g8.firebaseapp.com",
  projectId: "acme-explorer-g8",
  storageBucket: "acme-explorer-g8.appspot.com",
  messagingSenderId: "408887835652",
  appId: "1:408887835652:web:70fd310011ddec774f4951"
};

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
