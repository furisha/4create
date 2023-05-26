export class GreenKart_Functions {
  
  verify_greenkart_home_page_elements() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.txt_greenkart
      cy.get('.greenLogo').should('contain.text', testdata)
    })
  }

  home_page_elements_wdu() {
    cy.fixture('test_items').then((data) => {
      const testdata = data.txtCoursesAndPromoCodes
      // cy.wait(2000)
      cy.get('#udemy-promo-thumbnail').find('h1').should('contain.text', testdata)
    })
  }
}

export const usingGreenKart_Functions = new GreenKart_Functions()
