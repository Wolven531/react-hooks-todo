/// <reference types="Cypress" />
/// <reference types="mocha" />

// import { someUtil } from '@src/utils'

Mocha.it('shows app home page', () => {
	cy.visit('/')
	// cy.contains('.app')
	cy.title().should('equal', 'Todo Manager')
})
