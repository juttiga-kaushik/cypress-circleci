// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Spree Application', function() {

    it('Visits the Spree Login Page and Perform Login Action', function() {
        cy.visit("https://demo.spreecommerce.org/login")
        cy.get("input[name='spree_user[email]']").type('abcdefgh@gmail.com')
        cy.get("input[name='spree_user[password]']").type('12345678')
        cy.get("input[name='commit']").click()
        cy.get(".spree-mb-large").should('have.text','My Account')
    })

    it('Perform Logout Action in Spree', function() {
        cy.get("#account-button").click()
        cy.get("#link-to-account > [data-method='get']").click()
        cy.get("#existing-customer > .col-lg-11 > .spree-mb-large").should('have.text','Log in to continue')
    })
})