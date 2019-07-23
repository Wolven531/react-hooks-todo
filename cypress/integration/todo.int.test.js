/// <reference types="Cypress" />

// import { someUtil } from '@src/utils'

it('shows app home page', function () {
	cy.visit('/')
	// cy.contains('.app')
	cy.title().should('equal', 'Todo Manager')
})
