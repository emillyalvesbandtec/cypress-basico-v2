
// LODASH Significa que esse bloco de teste sera executado 3x
Cypress._.times(5, function(){
    it.only('testa a página da política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})