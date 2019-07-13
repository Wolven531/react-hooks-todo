import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import { ITodoFormProps, TodoForm } from './TodoForm'

configure({ adapter: new Adapter() })

describe('Shallow render TodoForm component', () => {
	let mockAddTodo = jest.fn()
	let wrapperTodoForm: ShallowWrapper<FC<ITodoFormProps>>

	beforeEach(() => {
		wrapperTodoForm = shallow(<TodoForm addTodo={mockAddTodo} />)
		wrapperTodoForm.update()
	})

	it('shallow renders properly', () => {
		expect(wrapperTodoForm.exists()).toBe(true)
	})

	describe('changing todo input', () => {
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
	})
})
