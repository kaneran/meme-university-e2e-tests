
/// <reference types="cypress" />
import { ARTICLE_CLOSE_INTRO, KERMIT_ARTICLE } from "./testIDs";
import {visitAndAssertHomePage, clickPageText, checkPageTitleVisible, assertHomePageHeader} from "./utils"

const linkText: string = 'KERMIT'

describe('The Kermit page should load and should contain the correct contents', () => {
    it('view the intro section and navigate back to homepage', () => {
        visitAndAssertHomePage()
        cy.get('a').contains(linkText).should('be.visible') // check intro link visible on homepage
        clickPageText(linkText) // click on the INTRO link 
        checkPageTitleVisible(linkText)
        cy.scrollTo('bottom')
        cy.get(`${KERMIT_ARTICLE} > p`).eq(1).should('be.visible') //check second copy is visible, didn't use cy.contains due to long text and that the text copy could change
        cy.scrollTo('top')
        cy.get(`[data-cy=${ARTICLE_CLOSE_INTRO}]`).click() // close the intro page
        assertHomePageHeader() // check navigated back to the homepage by checking the homepage header is visible
    })
});