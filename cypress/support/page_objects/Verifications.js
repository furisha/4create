export class Verifications {

  verify_greenkart_homepage_url() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.url_greenkart_homepage;
      cy.url().should('contain', testdata)
    })
  }

  verify_wdu_homepage_url() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.url_wdu_homepage;
      cy.url().should('contain', testdata)
    })
  }

  verify_greenkart_homepage_title() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.title_greenkart_homepage;
      cy.title().should('include', testdata)
    })
  }

  verify_wdu_homepage_title() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.title_wdu_homepage;
      cy.title().should('include', testdata)
    })
  }

}

export const usingVerifications = new Verifications()