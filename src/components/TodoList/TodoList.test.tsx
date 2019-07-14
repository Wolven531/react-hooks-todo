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

describe('Shallow render TodoList component', () => {
	let mockAddTodo: jest.Mock
	let wrapperTodoList: ShallowWrapper<FC<ITodoListProps>>

	beforeEach(() => {
		mockAddTodo = jest.fn()
		wrapperTodoList = shallow(<TodoList
			addTodo={mockAddTodo}
			clearCompletedTodos={jest.fn()}
			todos={[]}
			toggleTodo={jest.fn()} />)
		wrapperTodoList.update()
	})

	it('shallow renders properly, including TodoForm', () => {
		expect(wrapperTodoList.exists()).toBe(true)

		expect(wrapperTodoList.hasClass('todo-list')).toBe(true)

		const todoForm = wrapperTodoList.find(TodoForm)
		expect(todoForm.exists()).toBe(true)
		expect(todoForm.props().addTodo).toEqual(mockAddTodo)
	})
})
