/// <reference types="cypress" />

describe('Web Orders App Input Field Test - webOrdersInput.json', () => {
    var data = null
    var msgs = ['#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator2', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator3', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator4', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator5', '#ctl00_MainContent_fmwOrder_CustomValidator1', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator6', '#ctl00_MainContent_fmwOrder_RequiredFieldValidator7']
    before(function () {
        cy.fixture("webOrdersInput").then((d) => {
            data = d
            cy.visit(data.URL)
            //cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
            cy.get('input#ctl00_MainContent_username').type('Tester')
            cy.get('input#ctl00_MainContent_password').type('test')
            cy.get('input#ctl00_MainContent_login_button').click()
            cy.xpath("//a[text()='Order']").click()
        })
    })

    it('Product Order Form Verification', () => {
        let formData = data.formData
        for(var i = 0; i < 8; i++) {
            if(i != 0) {
                cy.get('#ctl00_MainContent_fmwOrder_txtQuantity').type(formData.Quantity)
            }
            if(i != 1) {
                cy.get('#ctl00_MainContent_fmwOrder_txtName').type(formData.Customer)
            }
            if(i != 2) {
                cy.get('#ctl00_MainContent_fmwOrder_TextBox2').type(formData.Street)
            }
            if(i != 3) {
                cy.get('#ctl00_MainContent_fmwOrder_TextBox3').type(formData.City)
            }
            if(i != 4) {
                cy.get('#ctl00_MainContent_fmwOrder_TextBox5').type(formData.Zip)
            }
            if(i != 5) {
                cy.get('#ctl00_MainContent_fmwOrder_cardList_1').click()
            }
            if(i != 6) {
                cy.get('#ctl00_MainContent_fmwOrder_TextBox6').type(formData.CardNum)
            }
            if(i != 7) {
                cy.get('#ctl00_MainContent_fmwOrder_TextBox1').type(formData.Expire)
            }
            cy.get('#ctl00_MainContent_fmwOrder_InsertButton').click()
            //cy.get(msgs[i]).should('have.text', data.expectedData[i])
            if(i == 5) {
                cy.get(msgs[i]).should('contain.text', data.expectedData[i])
            }
            else {
                cy.get(msgs[i]).should('contain.text', '\n                        '+data.expectedData[i]+'\n                    ')
            }
            cy.reload()
        }
    })
})
  