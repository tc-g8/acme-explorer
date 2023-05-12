import { HeaderPage } from 'cypress/page-objects/header.po';
import { TripDisplayPage } from 'cypress/page-objects/trip-display.po';
import { TripListPage } from 'cypress/page-objects/trip-list.po';

describe('Edit trip', () => {
  const headerPage = new HeaderPage();
  const tripListPage = new TripListPage();
  const tripDisplayPage = new TripDisplayPage();

  it('should edit trip', () => {
    headerPage.navigateToHome();

    headerPage.navigateToTrips();

    tripListPage.searchTrip();

    tripDisplayPage
      .getTripTitle()
      .should('include.text', 'Homestead, qui ipsum eiusmod reprehenderit');
  });
});
