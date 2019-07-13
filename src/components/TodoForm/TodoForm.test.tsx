import {
	configure,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { ITodoFormProps, TodoForm } from './TodoForm'

configure({ adapter: new Adapter() })

describe('Shallow render TodoForm component', () => {
	let mockAddTodo: jest.Mock
	let mockPreventDefault: jest.Mock
	let wrapperTodoForm: ShallowWrapper<FC<ITodoFormProps>>

	beforeEach(() => {
		mockAddTodo = jest.fn()
		mockPreventDefault = jest.fn()
		wrapperTodoForm = shallow(<TodoForm addTodo={mockAddTodo} />)
		wrapperTodoForm.update()
	})

	it('shallow renders properly', () => {
		expect(wrapperTodoForm.exists()).toBe(true)

		expect(wrapperTodoForm.find('button').text()).toBe('Add new task')
	})

	describe('change todo input', () => {
		beforeEach(() => {
			const todoInput = wrapperTodoForm.find('input')

			todoInput.simulate('change', { currentTarget: { value: ' some new todo ' } })
			wrapperTodoForm.update()
		})

		it('updates todo input display', () => {
			const todoInput = wrapperTodoForm.find('input')

			expect(todoInput.props()).toMatchObject({
				name: 'new-todo',
				placeholder: 'Enter a new task',
				type: 'text',
				value: ' some new todo '
			})
		})

		describe('click "Add Todo" button', () => {
			beforeEach(() => {
				const addTodoButton = wrapperTodoForm.find('button')

				addTodoButton.simulate('click', { preventDefault: mockPreventDefault })
				wrapperTodoForm.update()
			})

			it('calls preventDefault() and addTodo()', () => {
				expect(mockAddTodo).toHaveBeenCalledTimes(1)
				expect(mockPreventDefault).toHaveBeenCalledTimes(1)
				// expect(mockAddTodo).toHaveBeenLastCalledWith()
			})
		})
	})

	describe('click "Add Todo" button w/ empty input', () => {
		let mockAlert = jest.fn()

		beforeEach(() => {
			window.alert = mockAlert

			const addTodoButton = wrapperTodoForm.find('button')

			addTodoButton.simulate('click', { preventDefault: mockPreventDefault })
			wrapperTodoForm.update()
		})

		it('calls preventDefault() and window.alert() and NOT addTodo()', () => {
			expect(mockPreventDefault).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith('Todo must have a description')
			expect(mockAddTodo).not.toHaveBeenCalled()
		})
	})
})
