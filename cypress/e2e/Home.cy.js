describe("HomePage - anonym user", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    //Verifie qu'il est possible de connaitre le nombre d'utilisateur par les anonymes
    it('get number user before login', () => {
        cy.get("span[id=nbrUserInscrit]").then(($span) => {
            // capture what num is right now
            const num1 = parseFloat($span.text())
            expect(num1).to.eq(0)
            cy.get("input[id=dateDebut]").type('2023-12-12')
            cy.get("button[id=submit]").first().click()
            cy.wait(1000).then(() => {
                const num2 = parseFloat($span.text())
                expect(num2).not.equal(0)
            })
        })
    })
    //Verifie que la div des vacances n'est pas visible avant la connexion
    it('get vacance user before login', () => {
        cy.get("div[id=vacances]").should('not.exist')
    })

})

describe('HomePage - logged in user', () => {
    cy.login = function () {
        cy.visit('http://localhost:3000/login')
            cy.get("input[type=email]").type('j.komwabo@student.helmo.be')
            cy.get("input[type=password]").type('azerty')
            cy.get("button[id=submit]").click()
            cy.url().should('eq', 'http://localhost:3000/')
            cy.get("p[id=usermsg]").should('have.text','Bienvenue Kom')

    };
    beforeEach(() => {
        cy.login()
    })

    cy.logout = function () {
            cy.get("a[id=logoutbtn]").click()
            cy.url().should('eq', 'http://localhost:3000/')

    };
    afterEach(() => {
        cy.logout()
    })

    //Verifie que la div des vacances est présente après la connexion
    it('get vacance user before login', () => {
        cy.get("div[id=vacances]").should('be.visible')
    })
})