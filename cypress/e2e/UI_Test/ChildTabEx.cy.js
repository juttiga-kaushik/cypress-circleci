// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Child Tab Example', function () {
    // test case
    it.skip('Child Tab -Test 1', function (){
        // launch the url
        cy.visit("https://www.tutorialspoint.com/selenium/selenium_automation_practice.htm");
        // removing the target attribute from the link with removeAttr()
        cy.get('a[title="TutorialsPoint - Home"]')
        .invoke('removeAttr', 'target').click();
        // assertion to verify the current Url
        cy.url().should('include','https://www.tutorialspoint.com/index.htm');
        //cy.get('.mui-btn').click()
        // moving back to the parent tab with the help of go() method
        //cy.go('back');
        cy.go('back');
        // assertion to verify the current Url
        cy.url().should('include','/selenium_automation_practice.htm');
     });

         // test case
    it.only('Child Tab -Test 2', function (){
        // launch the url
        cy.visit("https://www.flipkart.com/");

        cy.xpath("//div[contains(text(),'2-Wheelers')]").click()
        cy.xpath("//a[contains(text(),'Bounce Infinity E1 Desat Silver Booking for Ex-sho')]").invoke('removeAttr', 'target').click();
        cy.url().should('include','/bounce-infinity')
        cy.go('back')
        cy.url().should('include','vehicles/bikes-scooters')
     });
})