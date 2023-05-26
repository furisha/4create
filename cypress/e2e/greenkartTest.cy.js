/// <reference types="cypress" />

import "cypress-real-events";
import { usingVerifications } from "../support/page_objects/Verifications";
import { usingGreenKart_Functions } from "../support/page_objects/GreenKart_Functions";

describe('greenkart_functionality/smoke_test', () => {

  let testdata

  before('open application', () => {
    cy.open_greenkart_homepage()
    cy.fixture('test_items').then((data) => {
      testdata = data
    })
    usingVerifications.verify_greenkart_homepage_url()
    usingVerifications.verify_greenkart_homepage_title()
  })

  it('Should add one item 4 times then 1 time items with minimum and maximum price to cart', () => {

    usingGreenKart_Functions.verify_greenkart_home_page_elements()

    // 2.1. Search for cucumber (txt from fixture test_items.json file)
    cy.get('.search-keyword').type(testdata.txt_vegetables_cucumber)
    cy.get('.no-results').should('not.exist')
    cy.get('.product:visible').should('have.length', 1)
    cy.get('.product').contains(testdata.txt_vegetables_cucumber).should('be.visible')

    // 2.1. Add 1 item in the basket 4 times using FOR loop
    cy.get('input.quantity').invoke('val').then((value) => {
      const inputValue = parseInt(value)
      const numberOfItemsToAdd = inputValue + testdata.number_of_items_to_add
      if (inputValue == 1) {
        for (let i = 0; i < numberOfItemsToAdd; i++) {
          cy.get('.increment').click()
          cy.wait(1000)
        }
      }
    })

    // 2.1 Should click "ADD TO CART" button and clear search field
    cy.get('.product').find('button').contains(testdata.button_add_to_cart_text).click().wait(2000)
    
    // 2.1 Should clear search field
    cy.get('.search-keyword').clear().wait(2000)

    // 2.2.(Bonus) Should add the cheapest/the most expensive items to the basket
    cy.get('.product').find('p').then(($prices) => {

      // Should create an empty array to store prices
      const prices = []

      // Should iterate over the elements and extract the prices
      $prices.each((index, element) => {
        const priceText = Cypress.$(element).text().trim()
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''))
        if (!isNaN(price)) {
          prices.push(price) // This will add/push price to const prices empty array
        }
      })

      // Should find the minimum/maximum price from stored prices array const
      const minimumPrice = Math.min(...prices)
      const maximumPrice = Math.max(...prices)

      // Should convert min/max prices to a string
      const minimumPriceString = minimumPrice.toString()
      const maximumPriceString = maximumPrice.toString()

      // Should log the minimum/maximum price
      cy.log('Minimum Price:', minimumPriceString)
      cy.log('Maximum Price:', maximumPriceString)

      // Should add product with max price
      cy.get('.product').contains(maximumPriceString).parent().then((maxprice) => {
        cy.wrap(maxprice).find('button').click().wait(2000)
      })

      // Should add product with min price
      cy.get('.product').contains(minimumPriceString).parent().then((minprice) => {
        cy.wrap(minprice).find('button').click().wait(2000)
      })

      // Should verify cart icon counter and click
      cy.get('.cart-icon').then(cart => {
        cy.wrap(cart).find('span').should('contain.text', testdata.cart_icon_counter)
        cy.wrap(cart).click()
      })

      // 3 Should proceed to checkout
      cy.get('.cart-preview').find('.action-block')
        .find('button').should('contain.text', 'PROCEED TO CHECKOUT').click()

      // Should add total amount in promo code field
      cy.get('.products').find('.totAmt')
        .invoke('text')
        .then(totalAmount => {
          // Should find the promo code field and enter the total amount
          cy.get('input.promoCode')
            .clear()
            .type(totalAmount)
        })

      cy.get('.products').then(product_elements => {

        // 4 Should click on "Apply" button and verify invalid code message
        cy.wrap(product_elements).find('.promoBtn').click()
        cy.wrap(product_elements).find('.promo-btn-loader').should('be.visible')
        cy.wrap(product_elements).find('.promoInfo').should('contain.text', 'Invalid code ..!')

        // 5 Should click on "Place Order" button
        cy.wrap(product_elements).find('button').contains('Place Order').click()

      })

      // 6.1 Should click on the "Choose Country" drop-down and verify that Select option is disabled
      cy.get('.wrapperTwo').then(choose_coutry_elements => {
        // Should verify country URL
        cy.url().should('eq', 'https://rahulshettyacademy.com/seleniumPractise/#/country')
        // Should drop-down menu contain Select
        cy.wrap(choose_coutry_elements).find('select').should('contain', 'Select')
        // Should verify terms and conditions text
        cy.wrap(choose_coutry_elements).find('input').parent().should('contain.text', 'Agree to the')
        cy.wrap(choose_coutry_elements).find('a').should('have.attr', 'href', '#/policy').and('contain.text', 'Terms & Conditions')
        // Should drop-down menu select element has arrtibute "disabled"
        cy.wrap(choose_coutry_elements).find('select').find('option').first().should('have.attr', 'disabled')
        // 6.2 Should create random index, random option and random country name then Select a random country
        cy.wrap(choose_coutry_elements).find('select').find('option').not('disabled').then(options => {
          const randomIndex = Cypress._.random(0, options.length - 1)
          const randomOption = Cypress.$(options[randomIndex])
          const countryName = randomOption.text()
          // Should select random option
          randomOption.select()
          // Should verify that the selected country is displayed
          cy.wrap(choose_coutry_elements).find('select').should('contain.text', countryName)
          // Should check checkbox, and click on "Proceed" button 
          cy.wrap(choose_coutry_elements).find('input[type="checkbox"]').click()
          cy.wrap(choose_coutry_elements).find('button').should('contain.text', 'Proceed').click()
          // Should verify redirection to "Home page"
          cy.url().should('eq', 'https://rahulshettyacademy.com/seleniumPractise/#/')

        })

      })


    })


  })

})