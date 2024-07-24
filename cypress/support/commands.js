Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Emilly')
    cy.get('#lastName').type('Santos')
    cy.get('#email').type('emillys259@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
})