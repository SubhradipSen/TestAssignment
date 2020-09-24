
/// <reference types="Cypress" />
import HomePage from '../../support/PageObjects/HomePage'
import { resetDatabase, visit, getTodoItems } from '../../support/util'


describe('My Test Suite',function()
{
 
    before(function()
    {
        cy.fixture('TestData').then(function(data)
        {
        this.data=data
        })
    })
    beforeEach(resetDatabase)
    beforeEach(visit)

it('TestCase_01, Application Launch', function() 
{

cy.get('.todoapp').should('be.visible')

})

it('TestCase_02, Checks if todo list is blank', () => {
    
    cy.getTodoItems().should('have.length', 0)

/*       export const resetDatabase = () => {

  const data = {
    todos: []
  }
  const str = JSON.stringify(data)
  cy.writeFile('cypress/fixture/TestData.json', {title: 'first item',completed: 'false',id : '4973171049'})
  cy.writeFile('cypress/fixture/TestData.json', {title: 'second item',completed: 'false',id: '7205378173'})
  cy.wait(1000)
} */
  })


  it('TestCase_03, Adds two items in to do list', () => 
  {
    enterTodo('clean my room')
    cy.type('{enter}')
    enterTodo('study for the exam')
    cy.type('{enter}')
    getTodoItems().should('have.length', 2)
  })


  it('TestCase_04, Adds two todo items and deletes first', () => {
    enterTodo('clean my room')
    cy.type('{enter}')
    enterTodo('study for the exam')
    cy.type('{enter}')
  
    getTodoItems().contains('clean my room').parent().find('.destroy').click({ force: true })
  
    getTodoItems().contains('clean my room').should('not.exist')
    getTodoItems().contains('study for the exam').should('exist')
    getTodoItems().should('have.length', 1)
  })

})