/// <reference types="Cypress"/>

describe("SignUpPage",() => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/signup')
    })
    it('enter different  password',() =>{
        cy.get("input[id=password]").type('1234')
        cy.get("input[id=confirmPassword]").type('12345')
        cy.get("p[id=errormsg]").should('have.text','Les mots de passe ne correspondent pas ! ')
    })
    it('enter same password',() =>{
        cy.get("input[id=password]").type('1234')
        cy.get("input[id=confirmPassword]").type('1234')
        cy.get("p[id=errormsg]").should('have.text','')
    })
    it('submit with same password and bad email',() =>{
        cy.get("input[id=password]").type('1234')
        cy.get("input[id=confirmPassword]").type('1234')
        cy.get("input[id=email]").type('j.komwabo.student.helmo.be')
        cy.get("p[id=errormsg]").should('have.text','L\'adresse e-mail n\'est pas valide !')
    })
    it('submit with fields incomplete',() =>{
        cy.get("input[id=password]").type('1234')
        cy.get("input[id=confirmPassword]").type('1234')
        cy.get("input[id=email]").type('j.komwabo@student.helmo.be')
        cy.get("button[id=submit]").click()
        cy.get("p[id=errormsg]").should('have.text','Veuillez remplir tous les champs requis.')
    })
})