// api-spec.js

import { resetDatabase, visit, getTodoItems } from '../../support/util'


describe('Testing via API', () => {
    beforeEach(resetDatabase)
  
  
    let counter = 1
    beforeEach(() => {
      counter = 1
    })
  
    /* const addTodo = title =>
      cy.request('POST', '/todos', {
        title,
        completed: false,
        id: String(counter++)
      }) */
  
/*     const fetchTodos = () => cy.request('/todos').its('body')
  
    const deleteTodo = (id) => cy.request('DELETE', `/todos/${id}`) */
  
    it('TC_01, adds todo', () => {
      addTodo('first todo')
      
      addTodo('second todo')
      
      fetchTodos().should('have.length', 2)
    })
  
    it('TC_02, adds todo and then verifies the same', () => {
      addTodo('first todo')
      
      addTodo('second todo')
      
      fetchTodos().should('deep.equal', [
        {
          title: 'first todo',
          completed: false,
          id: '1'
        },
        {
          title: 'second todo',
          completed: false,
          id: '2'
        }
      ])
    })
  
    it('TC_03, adds and deletes a todo', () => {
      addTodo('first todo')
    
      addTodo('second todo')
   
      deleteTodo('2')
      fetchTodos().should('deep.equal', [
        {
          title: 'first todo',
          completed: false,
          id: '1'
        }
        
      ])
      fetchTodos().should('notdeep.equal', [
        {
          title: 'second todo',
          completed: false,
          id: '2'
        }
        
      ])
      
    })

    it('TC_04, does not delete non-existent item', () => {
        cy.request({method: 'DELETE',
            url: 'todos/aaa111bbb',
            failOnStatusCode: false
          })
          .its('status').should('equal', 404)
      })


      it('TC_05, initial todos', () => {
     
        cy.server()
        cy.route('/todos', [{title: 'mock first',completed: false,id: '1'}, {title: 'mock second',completed: true,id: '2'}])
        visit()
        getTodoItems().should('have.length', 2).contains('li', 'mock second').find('.toggle').should('be.checked')
      })

      it('TC_06, is adding todo item to the list', () => {
        cy.server()
        cy.route({
            method: 'POST',
            url: 'localhost:3000'
          })
          .as('postTodo')
      
        // Launch Application UI
        visit()
        enterTodo('first item') 
        cy.type('{enter}')
      
        cy.wait('@postTodo').its('request.body').should('deep.equal', {title: 'first item',completed: false,id: '1'})
      })
      
      it('TC_07, is deleting a todo item with id 1', () => {
        cy.server()
        cy.route({
            method: 'DELETE',
            url: 'localhost:3000/1' 
          })
          .as('deleteTodo')
      
        //Launch Application UI
        visit()
        enterTodo('first item') 
        cy.type('{enter}')
        getTodoItems().first().find('.destroy').click({ force: true })
      
        cy.wait('@deleteTodo')
      })
  })