
/// <reference types="cypress" />
import {GEM_LOGO, FOOTER} from "./testIDs"
import {visitAndAssertHomePage, clickPageText, assertHomePageHeader, checkPageTitleVisible} from "./utils"

const links : string[] = ['KERMIT', 'SANIC', 'STORE', 'SEND SOME FUNNY MEMES'];

describe('The homepage should load and I should see the title', () => {
    it('loads and elements are visible', () => {
        visitAndAssertHomePage()
        assertHomePageHeader() // checks the title is in the source code, and visible
        cy.fixture('pageFixture.json').then((fixture) => {
            cy.get('p').contains('work of art').should("be.visible").should('have.text',fixture.homePage.subText)
            cy.get(`[data-cy=${GEM_LOGO}] svg`).should("be.visible") // looks for the ID assigned to the gem logo and assert the svg(gem image) is visible
            links.forEach((linkText, index) =>  {
                cy.get('li').contains(linkText).should('be.visible').click() // assert link visible and in a <li> tag, then click on it
                checkPageTitleVisible(linkText) // Assert header in a h2 tag
                cy.get('.close').eq(index).click() // Close the link for that page, used the 'close' css class as I assumed it was unique and thus less likely to change
        });
        cy.get(FOOTER).should('be.visible').find(`a[href="${fixture.homePage.footerUrl}"]`).should('be.visible') // checks footer copy and href link is visible
        clickPageText(links[0]) // uses the util function to click the text
        cy.get('p').contains(fixture.kermitPage.text).should("be.visible") // checks text in a <p> tag is visible on the page
        })
    })
})