import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire/compat';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HeaderComponent } from './components/master/header/header.component';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { ListTripsComponent } from './components/trip/list-trips/list-trips.component';
import { ListFavouritesComponent } from './components/trip/list-favourites/list-favourites.component';
import { ListSponsorshipsComponent } from './components/sponsorship/list-sponsorships/list-sponsorships.component';
import { DisplayTripComponent } from './components/trip/display-trip/display-trip.component';
import { ListManagerTripsComponent } from './components/trip/list-manager-trips/list-manager-trips.component';
import { ListTripApplicationsComponent } from './components/application/list-trip-applications/list-trip-applications.component';
import { ListExplorerApplicationsComponent } from './components/application/list-explorer-applications/list-explorer-applications.component';
import { DisplaySponsorshipComponent } from './components/sponsorship/display-sponsorship/display-sponsorship.component';
import { MainComponent } from './components/master/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    ListTripsComponent,
    ListFavouritesComponent,
    ListSponsorshipsComponent,
    ProfileComponent,
    FooterComponent,
    DisplayTripComponent,
    ListManagerTripsComponent,
    ListTripApplicationsComponent,
    ListExplorerApplicationsComponent,
    DisplaySponsorshipComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
