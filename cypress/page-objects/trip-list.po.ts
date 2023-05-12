export class TripListPage {
  navigateToEditTrip() {
    return cy
      .get(
        'body > app-root > main > div > div > app-list-manager-trips > div > div > div:nth-child(2) > div > div:nth-child(7) > div > div.col-12.col-sm-9 > div > div > div.text-end > div > button.btn.btn-primary'
      )
      .click();
  }

  getPageTitle() {
    cy.wait(5000);
    return cy.get(
      'body > app-root > main > div > div > app-list-manager-trips > div > div > div.d-flex.justify-content-between.mb-3 > h2'
    );
  }
}
