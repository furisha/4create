export class WDU_Functions {
  
  verify_wdu_elements() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.txt_courses_and_promo_codes
      cy.get('#udemy-promo-thumbnail').find('h1').should('contain.text', testdata)
    })
  }
}

export const usingWDU_Functions = new WDU_Functions()
