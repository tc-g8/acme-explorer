export class LoginPage {
    private credentials = {
        email: 'manager@gmail.com',
        password: 'Prueba_12345'
    };

    navigateTo() {
        return cy.visit('http://localhost:4200/login');
    }

    fillInLoginForm() {
        cy.get('#email').type(this.credentials.email);
        cy.get('#pwd').type(this.credentials.password);
        cy.get('[type="submit"]').click();
    }
}