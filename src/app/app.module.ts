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
import { ListApplicationsComponent } from './components/application/list-applications/list-applications.component';
import { CreateApplicationComponent } from './components/application/create-application/create-application.component';
import { DisplaySponsorshipComponent } from './components/sponsorship/display-sponsorship/display-sponsorship.component';
import { MainComponent } from './components/master/main/main.component';
import { DeniedAccessComponent } from './components/shared/denied-access/denied-access.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageComponent } from './components/master/message/message.component';
import { I18nModule } from './i18n.module';
import { CountDownComponent } from './components/trip/count-down/count-down.component';
import { ProfileEditComponent } from './components/actor/profile-edit/profile-edit.component';
import { ProfilePasswordEditComponent } from './components/actor/profile-password-edit/profile-password-edit.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxPayPalModule } from 'ngx-paypal';

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
    ListApplicationsComponent,
    CreateApplicationComponent,
    DisplaySponsorshipComponent,
    MainComponent,
    DeniedAccessComponent,
    DashboardComponent,
    MessageComponent,
    CountDownComponent,
    ProfileEditComponent,
    ProfilePasswordEditComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxPayPalModule,
  ],
  providers: [I18nModule.setLocale(), I18nModule.setLocaleId()],
  bootstrap: [AppComponent],
})
export class AppModule {}
