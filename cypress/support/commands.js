// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require('cypress-iframe')
import "cypress-localstorage-commands";

Cypress.Commands.add('LoginToAnyApp', (unameSelector, pwdSelector, lBtnSelector, uname,upass) => {
    // Enter UserName and Password
 
    cy.get(unameSelector).type(uname)
    cy.get(pwdSelector).type(upass)
    cy.get(lBtnSelector).click()
})
/*
"input[placeholder='Username']"
"input[placeholder='Password']"
"button[type='submit']"
*/

Cypress.Commands.add('Logout', () => {
    cy.xpath("//span[@class='oxd-userdropdown-tab']").click()
    cy.xpath("//a[text()='Logout']").click()
})

Cypress.Commands.add("LoginFixture", (file_name) => { 
    //using fixture in the command file
    cy.fixture(file_name).then(function(data){
    this.data = data;
    console.log(this.data);
    //Using Promise to handle the chain concept
    }).then(function(){
    cy.visit(this.data.URL);
    cy.get("input[placeholder='Username']").type(this.data.Uname)
    cy.get("input[placeholder='Password']").type(this.data.Upass)
    cy.get("button[type='submit']").click()

    })
})

//Below command to grab cookies value based on name of cookies
Cypress.Commands.add('getCookiesValue',() => {
    cy.getCookie('orangehrm')
    .should('have.property', 'value')
    .then((cookie) => {
        let cookieValue = cookie;
        //cy.log(cookieValue)
        return cookieValue
  });
});

//AuthToken Spreecom
Cypress.Commands.add('postToken', () => {
    cy.request({
      method: 'POST',
      //url: cypress.config.js('baseUrl'), //get from cypress.env.json
      url: 'https://demo.spreecommerce.org/spree_oauth/token',
      form: true, //sets to application/x-www-form-urlencoded
      body: {
        grant_type: 'password',
        username: "abcdefgh@gmail.com",
        password: "12345678"
      }
    })
    .its('body')
    .then(identity => {
        cy.setLocalStorage("access_token", identity.access_token)
    })
})