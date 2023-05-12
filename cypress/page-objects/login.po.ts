export class LoginPage {
  private managerCredentials = {
    email: 'manager@gmail.com',
    password: 'Prueba_12345',
  };

  navigateToLogin() {
    return cy.get('#headerCollapse > ul > li:nth-child(3) > a').click();
  }

  managerLogIn() {
    cy.get('#email').type(this.managerCredentials.email);
    cy.get('#pwd').type(this.managerCredentials.password);
    cy.get('[type="submit"]').click();
  }
}
