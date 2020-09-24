class HomePage
{
    getFirstName()
    {
        return cy.get('input#FirstName')
    }

    getLastName()
    {
        return cy.get('input[aria-describedby="ValidMsgLastName"]')
    }

    getEmail()
    {
        return cy.get('div input#Email')
    }
  
    getCountry()
    {
        return cy.get('#Country')
    }

    getCompany()
    {
        return cy.get('#Company')
    }

    getPhone()
    {
        return cy.get('#Phone')
    }

    getSubmitButton()
    {
        return cy.get('.mktoButton')
    }
}

export default HomePage;

