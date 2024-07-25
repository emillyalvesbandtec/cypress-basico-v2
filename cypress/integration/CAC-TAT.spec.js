// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS= 3000

    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {

         cy.title('').should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText =  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

        cy.clock()

        cy.get('#firstName').type('Emilly')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('emillys259@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Emilly')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('emillys259gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando não possui valor numerico', function(){
        cy.get('#phone')
            .type('abcd')
            .should('have.value',  '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Emilly')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('emillys@259gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
        
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Emilly')
            .should('have.value', 'Emilly')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Santos')
            .should('have.value', 'Santos')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('emillys@259gmail.com')
            .should('have.value', 'emillys@259gmail.com')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)  
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value= "feedback"]').check()
            .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('input[type="checkbox"][value="phone"]')
            .check()
            .fillMandatoryFieldsAndSubmit()
            .get('.error')
            .should('be.visible')

    })


    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]')
            //simulando que o usuário esta arrastando o arquivo
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    } )

    it('eleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example').as('arquivoExemplo')
        cy.get('input[type="file"]')
            .selectFile('@arquivoExemplo')
    })


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            // attr de atributo
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            // removendo o atributo target que abre em uma nova aba
            .invoke('removeAttr', 'target')
            .click()
            
            cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){

            // Pegando elemento com a classe success
            cy.get('.success')

            // Verificado que não está vísivel
              .should('not.be.visible')

            // Vai exibir esse elemtno que esta escondido
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Mensagem enviada com sucesso.')

            // Para esconder ele 
              .invoke('hide')

            // Verifica que não está mais vísivel 
              .should('not.be.visible')
            
            
              cy.get('.error')
              .should('not.be.visible')
              .invoke('show')
              .should('be.visible')
              .and('contain', 'Valide os campos obrigatórios!')
              .invoke('hide')
              .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function(){
        const LongText= Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        // Invoka o valor dessa area de texto e seta esse valor o texto longo 
        .invoke('val', LongText)
        .should('have.value', LongText)
    })


    it('faz uma requisição HTTP', function(){

        // usando request para fazer requisições a nível de rede http
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')   

        // Usado para fazer verificação, em uma função de callbabk recebendo a resposta da requisição
            .should(function(response){
                const {status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })

    })

    it.only('Encontra o gato escondido', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        
        cy.get('#title')
            .invoke('text', 'CAT TAT')
    })

  })