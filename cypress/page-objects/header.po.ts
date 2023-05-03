export class HeaderPage {

    navigateToTrips () {
        return cy.visit('http://localhost:4200/trips/manager/6436d2ef562d70fe957fb65d');
    }
}