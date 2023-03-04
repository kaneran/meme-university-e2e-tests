export const visitAndAssertHomePage = () => {
    const BASE_URL = `http://localhost:3000`;
    cy.visit(BASE_URL) // start by navigating to the web page
    cy.url().should('eq', `${BASE_URL}/`) // check the url is correct
}

export const assertHomePageHeader = () => {
    cy.fixture('pageFixture.json').then((fixture) => cy.get('h1').contains('University').should("be.visible").should('have.text',fixture.homePage.header))
}

export const clickPageText = (pageText: string) => {
    cy.contains(pageText).click()
}

export const checkPageTitleVisible = (pageTitle: string) => {
    cy.get('h2').contains(pageTitle).should('be.visible')
}