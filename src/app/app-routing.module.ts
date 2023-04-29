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
import { ListApplicationsComponent } from './components/application/list-applications/list-applications.component';
import { DisplaySponsorshipComponent } from './components/sponsorship/display-sponsorship/display-sponsorship.component';
import { MainComponent } from './components/master/main/main.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { DeniedAccessComponent } from './components/shared/denied-access/denied-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckoutComponent } from './components/payment/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'singin', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ActorRoleGuard],
    data: { expectedRole: 'administrator' },
  },
  {
    path: 'me',
    component: ProfileComponent,
    canActivate: [ActorRoleGuard],
    data: { expectedRole: 'explorer|manager|sponsor|administrator' },
  },
  {
    path: 'trips',
    children: [
      {
        path: ':id',
        component: DisplayTripComponent,
        canActivate: [ActorRoleGuard],
        data: {
          expectedRole: 'anonymous|explorer|manager|sponsor|administrator',
        },
      },
      {
        path: 'manager/:managerId',
        component: ListManagerTripsComponent,
        canActivate: [ActorRoleGuard],
        data: { expectedRole: 'manager' },
      },
      {
        path: '',
        component: ListTripsComponent,
        canActivate: [ActorRoleGuard],
        data: {
          expectedRole: 'explorer|anonymous|sponsor|administrator|manager',
        },
      },
    ],
  },
  {
    path: 'applications',
    children: [
      {
        path: 'trip/:tripId',
        component: ListApplicationsComponent,
        canActivate: [ActorRoleGuard],
        data: { expectedRole: 'manager' },
      },
      {
        path: 'explorer/:explorerId',
        component: ListApplicationsComponent,
        canActivate: [ActorRoleGuard],
        data: { expectedRole: 'explorer' },
      },
    ],
  },
  {
    path: 'favourites/explorer/:id',
    component: ListFavouritesComponent,
    canActivate: [ActorRoleGuard],
    data: { expectedRole: 'explorer' },
  },
  {
    path: 'sponsorships',
    children: [
      {
        path: 'sponsor/:sponsorId',
        component: ListSponsorshipsComponent,
        canActivate: [ActorRoleGuard],
        data: { expectedRole: 'sponsor' },
      },
      {
        path: ':id',
        component: DisplaySponsorshipComponent,
        canActivate: [ActorRoleGuard],
        data: { expectedRole: 'sponsor' },
      },
    ],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [ActorRoleGuard],
    data: { expectedRole: 'explorer' },
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
