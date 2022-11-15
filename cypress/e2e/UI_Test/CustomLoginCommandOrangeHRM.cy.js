// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('OranegHRM Application', function() {

    it('Visits the OrangeHRM Page and Perform Login Action', function() {
    //Visit the OrnageHRM Website
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // Enter UserName and Password
    //cy.LoginToAnyApp("input[placeholder='Username']", "input[placeholder='Password']", "button[type='submit']", 'Admin', 'admin123')

    cy.LoginFixture("login.json")
    cy.xpath("//span[text()='Dashboard']").should('have.text', 'Dashboard')
    cy.xpath("//span[@class='oxd-userdropdown-tab']").click()
    /*
    cy.xpath("//a[text()='Logout']").click()
    cy.url().should("include","web/index.php/auth/login")
    */
   cy.Logout()
  })

  })