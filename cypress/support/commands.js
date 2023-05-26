const { usingVerifications } = require("./page_objects/Verifications")

Cypress.Commands.add('open_greenkart_homepage', () => {
    cy.visit('/')
    // cy.title().should('include', 'GreenKart - veg and fruits kart')
    // usingVerifications.verify_greenkart_homepage_url()
})

Cypress.Commands.add('open_wdu_homepage', () => {
    cy.visit('https://www.webdriveruniversity.com')
})

Cypress.Commands.add('open_wdu_actions', () => {
    cy.visit('https://www.webdriveruniversity.com/Actions/index.html')
    cy.title().should('include', 'Actions')
})

Cypress.Commands.add('open_wdu_contact', () => {
    cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
    cy.title().should('include', 'Actions')
})