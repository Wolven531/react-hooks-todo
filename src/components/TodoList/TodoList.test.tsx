import {
	configure,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import { TodoForm } from '../TodoForm/TodoForm'
import { ITodoListProps, TodoList } from './TodoList'
import { Todo } from '../Todo/Todo';

configure({ adapter: new Adapter() })

describe('Shallow render TodoList component w/ empty list of Todo models', () => {
	let mockAddTodo: jest.Mock
	let mockClearCompletedTodos: jest.Mock
	let mockToggleTodo: jest.Mock
	let wrapperTodoList: ShallowWrapper<FC<ITodoListProps>>

	beforeEach(() => {
		mockAddTodo = jest.fn()
		mockClearCompletedTodos = jest.fn()
		mockToggleTodo = jest.fn()

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

	describe('click save button w/o localStorage avilable', () => {
		let mockAlert: jest.Mock
		let originalWindow: Window

		beforeEach(() => {
			originalWindow = window

			mockAlert = jest.fn()
			window.alert = mockAlert
			delete (window as any).localStorage

			const saveButton = wrapperTodoList.find('button.save')
			saveButton.simulate('click')
		})

		it('calls alert() w/ warning message (since localStorage is missing)', () => {
			expect(mockAlert).toHaveBeenCalledTimes(1)
			expect(mockAlert).toHaveBeenLastCalledWith('local storage not available, unable to save 😢')
		})

		afterEach(() => {
			window = originalWindow
		})
	})

	describe('click save button w/ localStorage avilable', () => {
		let mockSetItem: jest.Mock
		let originalLocalStorage: Storage

		beforeEach(() => {
			originalLocalStorage = window.localStorage
			mockSetItem = jest.fn(); // NOTE: semi needed for syntax

			(window as any).localStorage = {
				setItem: mockSetItem
			}

			const saveButton = wrapperTodoList.find('button.save')
			saveButton.simulate('click')
		})

		it('calls localStorage.setItem w/ empty list of Todo models', () => {
			expect(mockSetItem).toHaveBeenCalledTimes(1)
			expect(mockSetItem).toHaveBeenLastCalledWith('react-hooks-todo.todos', JSON.stringify([]))
		})

		afterEach(() => {
			(window as any).localStorage = originalLocalStorage
		})
	})
})

describe('Shallow render TodoList component w/ list of Todo models', () => {
	const fakeTodos = [
		new TodoModel('1', ' desc 1 ', true, 0),
		new TodoModel('2', ' desc 2 ', false, 1)
	]
	let mockToggleTodo: jest.Mock
	let wrapperTodoList: ShallowWrapper<FC<ITodoListProps>>

	beforeEach(() => {
		mockToggleTodo = jest.fn()

		wrapperTodoList = shallow(<TodoList
			addTodo={jest.fn()}
			clearCompletedTodos={jest.fn()}
			todos={fakeTodos}
			toggleTodo={mockToggleTodo} />)
		wrapperTodoList.update()
	})

	it('renders Todo components properly', () => {
		const todoComps = wrapperTodoList.find(Todo)

		// NOTE: cannot assert for `key` value
		expect(todoComps.first().props()).toMatchObject({
			todo: fakeTodos[0],
			toggleTodo: mockToggleTodo
		})
		expect(todoComps.at(1).props()).toMatchObject({
			todo: fakeTodos[1],
			toggleTodo: mockToggleTodo
		})
	})
})
