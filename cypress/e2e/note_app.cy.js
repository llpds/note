/* eslint-disable no-undef */
describe('Note app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'salainen'
    }
    
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    // cy.contains('HTML is easy2')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('test logged in')
  })
  
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('test')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })
    
    
    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    
    
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })
      
      it('it can be made not important', function () {
        cy.contains('another note cypress')
        .contains('make not important')
        .click()
        
        cy.contains('another note cypress')
        .contains('make important')
      })
    })
    
    
    
  })
})