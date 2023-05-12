export class TripDisplayPage {
  getTripTitle() {
    cy.wait(5000);
    return cy.get(
      'body > app-root > main > div > div > app-display-trip > div > div > div:nth-child(3) > div > div > div > div:nth-child(3) > div.col-12.col-md-8 > h3'
    );
  }
}
