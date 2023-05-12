export class HeaderPage {
  navigateToTrips() {
    cy.wait(5000);
    cy.get('#headerCollapse > ul > li:nth-child(2) > a > i').click();
    cy.get(
      '#headerCollapse > ul > li:nth-child(2) > ul > li:nth-child(2) > a'
    ).click();
  }
}
