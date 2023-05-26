# 4create
Assignment from 4Create

#### Used dependencies/version:
- cypress: 12.13.0
- cypress-real-events: 1.8.1
- @4tw/cypress-drag-drop: 2.2.3,
- cypress-mochawesome-reporter: 3.5.0// 

#### Open tests in Cypress CLI
Run all tests headless: `npx cypress open`

## Run Commands

#### Run all tests headless
`npx cypress run`

#### Run all tests headless
`npx cypress run all_tests`

#### Run only wdu_tests headless
`npx cypress run wdu_tests`

#### Run only gk_tests headless
`npx cypress run gk_tests`

### Note:
#### Missing step 8: In the same test open new tab and go to: Link
#### Created two separated test suites: 
- greenkartTest.cy.js
- webdriveruniversityTest.cy.js

#### Explanation: 
- Tests are fully separated websites. 
- Unnecessary test (In Cypress this is difficult/unpossible to jump from one browser tab to another)
