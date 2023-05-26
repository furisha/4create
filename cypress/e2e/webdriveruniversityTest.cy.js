/// <reference types="cypress" />

import "cypress-real-events";
import { usingVerifications } from "../support/page_objects/Verifications";
import { usingWDU_Functions } from "../support/page_objects/WDU_Functions";
require('@4tw/cypress-drag-drop')

describe('webdriver_university_page_functionality/smoke_test', () => {

  let testdata_wdu

  before('open webdriver_university_homepage()', () => {
    cy.open_wdu_homepage()
    cy.fixture("test_items").then((data) => {
      testdata_wdu = data
    })
    usingVerifications.verify_wdu_homepage_url()
    usingVerifications.verify_wdu_homepage_title()
  })

  it('Function tests for WebDriverUniversity Site', () => {

    usingWDU_Functions.verify_wdu_elements()

    // 9.1 Should scroll down to "Actions" and take a screenshoot
    cy.get('#actions').scrollIntoView().should('be.visible').screenshot("specific_screenshots/actions_screenshot_new", { overwrite: true })
    cy.get('#actions').should('have.prop', 'href').and('equal', testdata_wdu.href_actions)
    
    // 9.2 Should click on Actions, open tab in the same window by invoking and removing attribute "target"
    cy.get('#actions').invoke("removeAttr", "target").click()
    
    // 10.1 Should go back to WDU homepage
    cy.go('back').screenshot('specific_screenshots/wdu_homepage', { overwrite: true })
    cy.url().should('eq', testdata_wdu.url_wdu_homepage)
    cy.wait(2000)
    
    // 10.2. Should go to "Action" and verify that the "title" of the page contains "Actions"
    cy.go('forward').screenshot('specific_screenshots/wdu_actions_page', { overwrite: true })
    cy.url().should('eq', testdata_wdu.href_actions)
    cy.title().should('contain', 'Actions')

    // 11 Should drag draggable item and drop it to droppable box
    cy.get('#draggable').should('be.visible').as('Drag')
    cy.get('#droppable').should('be.visible').as('Drop')
    cy.get('@Drag').drag('@Drop', { force: true })
    cy.wait(1000)

    // 12 Should verify that “Link 1” is not visible until user hovers 
    // (Mouse Over) “Hover Over Me First” button
    // “Link 1” should not be visible on the page
    cy.get('.list-alert').should('not.be.visible')
    cy.get('#div-hover').find('button').eq(0).realHover()
    cy.get('.dropdown-content').eq(0).realHover()
    cy.get('.dropdown-content').eq(0).find('.list-alert').click();

    // 13 Should hover (Mouse Over) “Hover Over Me First” button and verify
    // “Link 1” should be visible on the page upon hover
    // Stub the window.alert method
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');

      // 14 Should click on “Link 1” and verify "Alert message is displayed"
      // Trigger the event that will generate the alert popup message
      cy.get('.dropdown-content').eq(0).find('.list-alert').click();

      // 15 Should save "Alert text" in a variable "alertText"
      // 16 Skip
      cy.get('@windowAlert').then((stub) => {
        const alertText = stub.args[0][0]
        expect(alertText).to.equal(testdata_wdu.txt_alert_message)
        cy.wait(2000)
        // 17. Should open new window for "WDU contact Us" 
        // and landed on "Contact Us" page
        cy.visit(testdata_wdu.goto_contact_us_page_url)
        // 18 Should in the "Comment text box" enter the 
        // "Alert text" (variable saved in test step "15")
        cy.get('form').then(form_elements => {
          cy.wrap(form_elements).find('textarea').type(alertText)
        })
      });
    });
  })

})

