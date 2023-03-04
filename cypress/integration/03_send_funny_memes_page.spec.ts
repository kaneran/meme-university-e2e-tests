
/// <reference types="cypress" />

import { checkPageTitleVisible, clickPageText, EMAIL, MESSAGE, NAME, CONTACT, visitAndAssertHomePage } from ".";

const linkTitle : string = 'SEND SOME FUNNY MEMES'
const requiredFieldIds : string[] = [EMAIL, MESSAGE] // I assumed that at least an email and message is needed by the contact form i.e users can have some anonymity by not entering name
const allFieldIds : string[] = [...requiredFieldIds,NAME]

describe('As a user I should be able to use the form', () => {
    //Navigate to the Send Funny Memes page and verify the title and all fields visible and in correct state
    beforeEach(() => {
        visitAndAssertHomePage()
        clickPageText(linkTitle)
        checkPageTitleVisible(linkTitle)
        checkAllFieldsEmpty() // Check that all fields are empty upon displaying the contact page
        cy.get(CONTACT).find('a').should('be.visible') // Assert that social media links are visible
    })

    it('fill all fields and submit the form', () => {
        fillOutForm()
        sendMessage()
    })

    it('fill only required fields and submit the form' , () => {
        fillOutForm(requiredFieldIds)
        sendMessage()
    })

    it('fill all fields, reset the form, fill all fields again and submit the form', () => {
        fillOutForm()
        resetForm()
        fillOutForm()
        sendMessage()
    })

    it('fill only required fields, reset the form, fill required fields again and submit the form', () => {
        fillOutForm(requiredFieldIds)
        resetForm()
        fillOutForm(requiredFieldIds)
        sendMessage()
    })
});

/**
 * Add your helper functions here
 */
const fillOutForm = (fieldIds : string[] = allFieldIds) => {
    const inputData: string = 'Dummy test'
    fieldIds.forEach((fieldId) => //for each field, assert input field visible, enter text and assert the input contains the entered text
        cy.get(fieldId).should('be.visible').type(inputData).invoke('val').then((inputText) => expect(inputText).to.equal(inputData))
    )
}

const sendMessage = () => {
    cy.get('input[value="Send Message"]').should('be.visible').click() // Assert send message button visible and click on it
    cy.fixture('pageFixture.json').then((fixture) => cy.get('body').contains(fixture.contactPage.successText).should('be.visible')) //Assert that the submission success messsage is displayed
}

const resetForm = () => {
    cy.get('input[type="reset"]').should('be.visible').click() // Assert reset button visible and click on it
     checkAllFieldsEmpty() // Assert each field in the contact page is empty after reset
}

const checkAllFieldsEmpty = () => allFieldIds.forEach((fieldId) => cy.get(fieldId).invoke('val').then((inputText) => expect(inputText).to.equal('')))