export class HeaderPage {
  navigateToHome() {
    cy.visit('http://localhost:4200/');
  }

  navigateToTrips() {
    cy.get('#headerCollapse > ul > li:nth-child(1) > a').click();
  }

  navigateToManagerTrips() {
    cy.wait(5000);
    cy.get('#headerCollapse > ul > li:nth-child(2) > a > i').click();
    cy.get(
      '#headerCollapse > ul > li:nth-child(2) > ul > li:nth-child(2) > a'
    ).click();
  }
}
