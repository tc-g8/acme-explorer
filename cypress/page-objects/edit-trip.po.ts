export class EditTripPage {

    fillInEditTripForm() {
        cy.get('input[formcontrolname="title"]').type('Titulo para un viaje de prueba');
        cy.get('body > app-root > main > div > div > app-edit-trip > div > div > form > div.d-grid > button').click();
        cy.get('#confirmationModal > div > div > div.modal-footer > button.btn.btn-primary').click();
    }

}