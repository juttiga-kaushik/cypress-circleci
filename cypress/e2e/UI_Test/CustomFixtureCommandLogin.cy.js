Cypress.Commands.add("Login_fixture", (file_name) => { 
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
