/// <reference types="Cypress"/>

describe("LoginPage",() =>{
    beforeEach(()=>{
            cy.visit('http://localhost:3000/login')
    })
    it('add bad email and get error message',() =>{
        cy.get("input[type=email]").type('j.komwabo')
        cy.get("p[id=errormsg]").should('have.text','L\'adresse e-mail n\'est pas valide !')
    })

    it('login with bad credentials and get 400',() =>{
        cy.get("input[type=email]").type('j.komwabo@student.helmo.be')
        cy.get("input[type=password]").type('123456')
        cy.get("button[id=submit]").click()
        cy.get("div[id=alertmsg]").should('have.text','Login Failed Error: HTTP error! Status: 400')
    })
    it('login with good credentials',() =>{
        cy.get("input[type=email]").type('j.komwabo@student.helmo.be')
        cy.get("input[type=password]").type('azerty')
        cy.get("button[id=submit]").click()
        cy.url().should('eq', 'http://localhost:3000/')
        cy.get("p[id=usermsg]").should('have.text','Bienvenue Kom')
    })

    it('TestAPI-Signin Bad credential',() => {
        cy.request({
            method: 'POST',
            url: 'http://studapps.cg.helmo.be:5010/REST_AHME_VERD_WABO/user/signin', // baseUrl is prepend to URL
            body: {
                email: 'jane.lane@gmail.com',
                passwd: 'password123',
            },
            failOnStatusCode: false, // Ajoutez cette option pour éviter l'échec en cas de code d'état non 2xx ou 3xx
        }).then((resp)=>{
            expect(resp.status).to.eq(400)
            expect(resp.body.message).to.eq('Could not find user')
        })
    })

    it('TestAPI-Signin good credential',() => {
        cy.request({
            method: 'POST',
            url: 'http://studapps.cg.helmo.be:5010/REST_AHME_VERD_WABO/user/signin', // baseUrl is prepend to URL
            body: {
                email: 'j.komwabo@student.helmo.be',
                passwd: 'azerty',
            },
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
        })
    })
})