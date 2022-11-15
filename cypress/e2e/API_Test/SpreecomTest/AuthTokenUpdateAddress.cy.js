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
  
    it("Update an Address", () => {
      cy.getLocalStorage("access_token").should("exist");
      cy.getLocalStorage("access_token").then(token => {
        console.log("access_token", token);

        cy.request({
          method: 'PATCH',
          url: 'https://demo.spreecommerce.org/api/v2/storefront/account/addresses/58009',
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
                country_iso: "US",
                label: "Office"
              }
      }}).then((response)=>{
      expect(response.status).to.equal(200);
       // response.body is automatically serialized into JSON
       cy.log(response.body);
       expect(response.body.data).to.have.property('type','address')
       //expect(response.body.data.attributes).to.have.property('address1','22nd Street')
       expect(response.body.data.attributes).to.have.property('firstname','Harry')

  });
});
});

});