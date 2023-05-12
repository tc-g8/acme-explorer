export class TripListPage {
  navigateToEditTrip() {
    return cy
      .get(
        'body > app-root > main > div > div > app-list-manager-trips > div > div > div:nth-child(2) > div > div:nth-child(7) > div > div.col-12.col-sm-9 > div > div > div.text-end > div > button.btn.btn-primary'
      )
      .click();
  }

  searchTrip() {
    cy.get(
      'body > app-root > main > div > div > app-list-trips > form > div > div.col-9.col-md-6.offset-md-2.col-lg-5.offset-lg-3 > input'
    ).type('Homestead');
    cy.get(
      'body > app-root > main > div > div > app-list-trips > form > div > div.d-grid.col-3.col-md-2.col-lg-1 > button'
    ).click();
    cy.wait(500);
    cy.get(
      'body > app-root > main > div > div > app-list-trips > div > div > div > div > div.col-12.col-sm-9 > div > div > div.col-12.col-lg-8 > h4'
    ).click();
  }

  getPageTitle() {
    cy.wait(5000);
    return cy.get(
      'body > app-root > main > div > div > app-list-manager-trips > div > div > div.d-flex.justify-content-between.mb-3 > h2'
    );
  }
}
