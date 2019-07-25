/// <reference types="Cypress" />

// import { someUtil } from '@src/utils'

describe('visit Todo Manager page', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('should render app w/ informative header', () => {
		cy.title().should('equal', 'Todo Manager')

		cy.get('.app')
			.find('h1')
			.should('have.text', 'Todo Manager')
	})

	describe('enter new todo and click add', () => {
		beforeEach(() => {
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.clear()
				.type(' a new todo ')
			cy.get('form')
				.find('button')
				.contains('Add new task')
				.click()
		})

		it('should add todo w/ text and clear input text', () => {
			cy.get('.todo')
				.should('have.length', 1)
				.first()
				.find('.description')
				.should('have.text', ' a new todo ')
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.should('have.value', '')
		})

		describe('click newly added todo', () => {
			beforeEach(() => {
				cy.get('.todo').click()
			})

			it('should toggle todo item (to complete)', () => {
				cy.get('.todo').should('have.class', 'completed')
			})
		})
	})
})

describe('visit nonsense page', () => {
	beforeEach(() => {
		cy.visit('/asdf')
	})

	it('should render "not found" page', () => {
		cy.title().should('equal', 'Page Not Found')

		cy.get('h1')
			.should('have.text', 'Page not found')
	})
})
