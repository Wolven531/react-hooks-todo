/// <reference types="Cypress" />

// import { someUtil } from '@src/utils'

// NOTE: need to import jest due to --isolatedModules
// NOTE: naming the import with `_` prefixed skips import usage check
import * as _jest from 'jest'

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

	describe('enter two new todo items and click add', () => {
		beforeEach(() => {
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.clear()
				.type(' a new todo ')
			cy.get('form')
				.find('button')
				.contains('Add new task')
				.click()
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.clear()
				.type(' a new todo 2 ')
			cy.get('form')
				.find('button')
				.contains('Add new task')
				.click()
		})

		it('should add todo w/ text and clear input text', () => {
			cy.get('.todo')
				.should('have.length', 2)
				.first()
				.find('.description')
				.should('have.text', ' a new todo ')
			cy.get('form')
				.find('input[placeholder="Enter a new task"]')
				.should('have.value', '')
		})

		describe('click first todo', () => {
			beforeEach(() => {
				cy.get('.todo').first().click()
			})

			it('should toggle first todo item (to complete) but leave second untouched', () => {
				cy.get('.todo').first().should('have.class', 'completed')
				cy.get('.todo').eq(1).should('not.have.class', 'completed')
			})

			describe('click completed todo', () => {
				beforeEach(() => {
					cy.get('.todo.completed').click()
				})

				it('should toggle todo item (to incomplete)', () => {
					cy.get('.todo').first().should('not.have.class', 'completed')
				})
			})
		})

		describe('click second todo and click clear button', () => {
			beforeEach(() => {
				cy.get('.todo').eq(1).click()
				cy.get('.todo-list').find('button.clear').click()
			})

			it('should remove second item but leave first untouched', () => {
				cy.get('.todo').should('have.length', 1)
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
