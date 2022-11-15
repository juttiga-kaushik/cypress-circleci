var addressId = null
describe("postToken", ()=> {
    before(() => {
      cy.postToken();
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
    });
  
    it("should exist identity in localStorage", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token token", token);
      });
    });
  
    it("Create an Address", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token", token);

        cy.request({
          method: 'POST',
          url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses',
          auth: {
              bearer: token
              
          },
          body :
          {
              "address": {
                firstname: "Harry",
                lastname: "Kane",
                address1: "22nd Street",
                address2: "3rd Floor",
                city: "Bethesda",
                phone: "3014445002",
                zipcode: "20814",
                state_name: "MD",
                country_iso: "US"
              }
      }}).then((response)=>{
      expect(response.status).to.equal(200);
       // response.body is automatically serialized into JSON
       cy.log(response.body);
       addressId = response.body.data.id
       expect(response.body.data).to.have.property('type','address')
       //expect(response.body.data.attributes).to.have.property('address1','22nd Street')
       expect(response.body.data.attributes).to.have.property('firstname','Harry')

  });
});
});
it('Visits the Spree Account Page and Check Address', function() {
    cy.visit("https://demo.spreecommerce.org/login")
    cy.get("input[name='spree_user[email]']").type('abcdefgh@gmail.com')
    cy.get("input[name='spree_user[password]']").type('12345678')
    cy.get("input[name='commit']").click()
    cy.get('.account-page-user-full-name').should('contain.text', 'Harry Kane')
    //cy.xpath('//a[@href="/addresses/'+addressId+'/edit"]')
})
});