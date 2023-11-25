/* eslint-disable no-undef */
describe('Note app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'test',
      username: 'test',
      password: 'salainen'
    }
    
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('wrong')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
    .should('contain', 'rong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    cy.contains('Matti Luukkainen logged in').should('not.exist')
  })

  

  it('front page can be opened', function() {
    cy.contains('Notes')
    // cy.contains('HTML is easy2')
  })

  it('login form can be opened', function() {
    cy.login({ username: 'test', password: 'salainen' })
    cy.contains('test logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'salainen' })
      cy.createNote({ content: 'first note', important: false })
      cy.createNote({ content: 'second note', important: false })
      cy.createNote({ content: 'third note', important: false })
    })
    
    it('one of those can be made important', function () {
      cy.contains('second note')
        .parent()
        .find('button')
        .as('theButton')

      cy.get('@theButton').click()
      cy.get('@theButton').contains('make not important')
    })
    
    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    
    
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ 
          content: 'another note cypress',
          important: true
        })
      })
      
      it('it can be made not important', function () {
        cy.contains('another note cypress').parent().find('button').as('anotherNote')
        
        cy.get('@anotherNote').click()
        cy.get('@anotherNote').contains('make important')
      })
    })   
  })
})