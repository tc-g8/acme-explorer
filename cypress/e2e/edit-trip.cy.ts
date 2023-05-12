import { EditTripPage } from 'cypress/page-objects/edit-trip.po';
import { HeaderPage } from 'cypress/page-objects/header.po';
import { LoginPage } from 'cypress/page-objects/login.po';
import { TripListPage } from 'cypress/page-objects/trip-list.po';

describe('Edit trip', () => {
  const loginPage = new LoginPage();
  const headerPage = new HeaderPage();
  const tripListPage = new TripListPage();
  const editTripPage = new EditTripPage();

  it('should edit trip', () => {
    headerPage.navigateToHome();

    loginPage.navigateToLogin();

    loginPage.managerLogIn();

    headerPage.navigateToManagerTrips();

    tripListPage.navigateToEditTrip();

    editTripPage.fillInEditTripForm();

    tripListPage.getPageTitle().should('include.text', 'My Trips');
  });
});
