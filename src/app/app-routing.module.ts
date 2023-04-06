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
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessComponent } from './components/shared/denied-access/denied-access.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: ProfileComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager|sponsor|administrator'} },
  {
    path: 'trips',
    children: [
      { path: ':id', component: DisplayTripComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer|manager'} },
      { path: 'manager/:id', component: ListManagerTripsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'} },
      { path: '', component: ListTripsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer|anonymous'} },
    ],
  },
  {
    path: 'applications',
    children: [
      { path: 'trip/:id', component: ListTripApplicationsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'manager'} },
      { path: 'explorer/:id', component: ListExplorerApplicationsComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'} },
    ],
  },
  { path: 'favourites/explorer/:id', component: ListFavouritesComponent, canActivate: [ActorRoleGuard], data: {expectedRole: 'explorer'} },
  {
    path: 'sponsorships',
    children: [
      { path: 'sponsor/:id', component: ListSponsorshipsComponent },
      { path: ':id', component: DisplaySponsorshipComponent },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'denied-access', component: DeniedAccessComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}