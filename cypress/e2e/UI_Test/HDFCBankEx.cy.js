// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('HDFC Application', function() {

    it('Login Verification', function() {
        cy.visit("https://netbanking.hdfcbank.com/netbanking/");
        cy.get("frame[name='login_page']").then(function ($iframe) {
            const iframeele = $iframe.contents().find('input[name="fldLoginUserId"]')
            //cy.wrap(iframeele).type('1000')
            const iframebutton = $iframe.contents().find(".btn.btn-primary.login-btn")
            cy.wrap(iframebutton).click()
        })
        cy.on('window:alert', function (alertText) {
            expect(alertText).eq('Customer ID  cannot be left blank.')
            return true
        })
    })
})