export const resetDatabase = () => {
    console.log('resetDatabase')
    cy.request({
      method: 'POST',
      url: '/reset',
      body: {
        todos: []
      }
    })
  }

//Launches the application under test
  export const visit = () => cy.visit('localhost:3000')

  //Retrieves the object with class attribute 'todoapp''
  export const getTodoApp = () => cy.get('.todoapp')

  //Retrieves all the to do items present in the list
  export const getTodoItems = () => getTodoApp().find('.todo-list').find('li')

  //Adds new todo items to list
  export const enterTodo = (text = 'example todo') =>  getTodoApp().find('.new-todo').type(text)
  
  //a post api request is sent as per the parameters passed
  export const addTodo = title => cy.request('POST', '/todos',{title,completed: false,id: String(counter++)})

  //retrieves the content of the page
  export const fetchTodos = () => cy.request('localhost:3000').its('body')
  
  //deletes the todo item according to the id passed
  export const deleteTodo = (id) => cy.request('DELETE', `/todos/${id}`)