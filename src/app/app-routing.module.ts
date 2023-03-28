import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ListTripsComponent } from './components/trip/list-trips/list-trips.component';
import { ListFavouritesComponent } from './components/trip/list-favourites/list-favourites.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { ListSponsorshipsComponent } from './components/sponsorship/list-sponsorships/list-sponsorships.component';
import { DisplayTripComponent } from './components/trip/display-trip/display-trip.component';
import { ListManagerTripsComponent } from './components/trip/list-manager-trips/list-manager-trips.component';
import { ListTripApplicationsComponent } from './components/application/list-trip-applications/list-trip-applications.component';
import { ListExplorerApplicationsComponent } from './components/application/list-explorer-applications/list-explorer-applications.component';
import { DisplaySponsorshipComponent } from './components/sponsorship/display-sponsorship/display-sponsorship.component';
import { MainComponent } from './components/master/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: ProfileComponent },
  { path: 'trips', component: ListTripsComponent, children: [
    { path: ':id', component: DisplayTripComponent },
    { path: 'manager/:id', component: ListManagerTripsComponent }
  ]},
  { path: 'applications', children: [
    { path: 'trip/:id', component: ListTripApplicationsComponent },
    { path: 'explorer/:id', component: ListExplorerApplicationsComponent },
  ]},
  { path: 'favourites/explorer/:id', component: ListFavouritesComponent },
  { path: 'sponsorships', children: [
    { path: 'sponsor/:id', component: ListSponsorshipsComponent },
    { path: ':id', component: DisplaySponsorshipComponent }
  ]},
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
