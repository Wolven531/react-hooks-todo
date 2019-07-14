import {
	configure,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { ITodoListProps, TodoList } from './TodoList'
import { TodoForm } from '../TodoForm/TodoForm';

configure({ adapter: new Adapter() })

describe('Shallow render TodoList component w/ empty list of Todo models and w/o localStorage', () => {
	let mockAddTodo: jest.Mock
	let mockAlert: jest.Mock
	let mockClearCompletedTodos: jest.Mock
	let mockToggleTodo: jest.Mock
	let wrapperTodoList: ShallowWrapper<FC<ITodoListProps>>

	beforeEach(() => {
		mockAddTodo = jest.fn()
		mockAlert = jest.fn()
		mockClearCompletedTodos = jest.fn()
		mockToggleTodo = jest.fn(); // NOTE: this semi is necessary because of next line

		(window as any).alert = mockAlert; // NOTE: this semi is necessary because of next line
		(window as any).localStorage = null

		wrapperTodoList = shallow(<TodoList
			addTodo={mockAddTodo}
			clearCompletedTodos={mockClearCompletedTodos}
			todos={[]}
			toggleTodo={mockToggleTodo} />)
		wrapperTodoList.update()
	})

	it('shallow renders properly, including TodoForm, buttons, and empty message', () => {
		expect(wrapperTodoList.exists()).toBe(true)

		expect(wrapperTodoList.hasClass('todo-list')).toBe(true)

		const todoForm = wrapperTodoList.find(TodoForm)
		expect(todoForm.exists()).toBe(true)
		expect(todoForm.props().addTodo).toEqual(mockAddTodo)

		const clearButton = wrapperTodoList.find('button.clear')
		expect(clearButton.exists()).toBe(true)
		expect(clearButton.text()).toBe('Clear completed Todo items')

		const saveButton = wrapperTodoList.find('button.save')
		expect(saveButton.exists()).toBe(true)
		expect(saveButton.text()).toBe('Save Todo list')

		const emptyMessage = wrapperTodoList.find('.empty-msg')
		expect(emptyMessage.exists()).toBe(true)
		expect(emptyMessage.text()).toBe('No todos are saved')
	})

	describe('click clear button', () => {
		beforeEach(() => {
			const clearButton = wrapperTodoList.find('button.clear')
			clearButton.simulate('click')
		})

		it('calls provided clearCompletedTodos() function', () => {
			expect(mockClearCompletedTodos).toHaveBeenCalledTimes(1)
		})
	})

	// describe('click save button', () => {
	// 	beforeEach(() => {
	// 		const saveButton = wrapperTodoList.find('button.save')
	// 		saveButton.simulate('click')
	// 	})

	// 	it('calls alert() w/ warning message (since localStorage is missing)', () => {
	// 		expect(mockAlert).toHaveBeenCalledTimes(1)
	// 		expect(mockAlert).toHaveBeenLastCalledWith('local storage not available, unable to save 😢')
	// 	})
	// })
})
