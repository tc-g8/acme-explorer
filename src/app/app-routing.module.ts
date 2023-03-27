import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { ListTripsComponent } from './components/trip/list-trips/list-trips.component';
import { ListApplicationsComponent } from './components/application/list-applications/list-applications.component';
import { ListFavouritesComponent } from './components/trip/list-favourites/list-favourites.component';
import { CreateManagerComponent } from './components/actor/create-manager/create-manager.component';
import { DisplayComponent as DisplayDashboard } from './components/dashboard/display/display.component';
import { DisplayComponent as DisplayConfiguration } from './components/configuration/display/display.component';
import { ProfileComponent } from './components/actor/profile/profile.component';
import { ListSponsorshipsComponent } from './components/sponsorship/list-sponsorships/list-sponsorships.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: RegisterComponent }, // Primera vista (por defecto)
  { path: 'trips/list', component: ListTripsComponent },
  { path: 'applications/list', component: ListApplicationsComponent },
  { path: 'trips/favourites', component: ListFavouritesComponent },
  { path: 'actors/create-manager', component: CreateManagerComponent },
  { path: 'dashboard', component: DisplayDashboard },
  { path: 'config', component: DisplayConfiguration },
  { path: 'me', component: ProfileComponent },
  { path: 'sponsorships/list', component: ListSponsorshipsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
