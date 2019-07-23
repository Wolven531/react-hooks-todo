/// <reference types="Cypress" />

// import { someUtil } from '@src/utils'

describe('Todo Manager page', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('renders app w/ informative header', () => {
		cy.title().should('equal', 'Todo Manager')

		cy.get('.app')
			.find('h1')
			.contains(/Todo Manager/)
	})

	describe('entering new todo and clicking add', () => {
		beforeEach(() => {
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.type(' a new todo ')
			cy.get('form')
				.find('button')
				.click()
		})

		it('should add todo w/ text', () => {
			cy.get('.todo')
				.should('have.length', 1)
			cy.get('.todo')
				.first()
				.find('.description')
				.should('have.text', ' a new todo ')
		})
	})
})
