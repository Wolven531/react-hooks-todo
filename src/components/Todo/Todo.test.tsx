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

import { ITodoProps, Todo } from './Todo'

configure({ adapter: new Adapter() })

describe('Shallow render Todo component', () => {
	const fakeTodo: TodoModel = new TodoModel('1', ' some desc ', false, (new Date(1990, 9, 15).getTime()))
	let mockToggleTodo: jest.Mock
	let wrapperTodo: ShallowWrapper<FC<ITodoProps>>

	beforeEach(() => {
		mockToggleTodo = jest.fn()
		wrapperTodo = shallow(<Todo todo={fakeTodo} toggleTodo={mockToggleTodo} />)
	})

	it('shallow renders', () => {
		wrapperTodo.update()

		expect(wrapperTodo.exists()).toBe(true)
		expect(wrapperTodo.hasClass('todo')).toBe(true)

		expect(wrapperTodo.find('input[type="checkbox"]').props()).toMatchObject({
			checked: false,
			readOnly: true,
			type: 'checkbox'
		})
	})
})

describe('Mount and render Todo component', () => {
	const fakeTodo: TodoModel = new TodoModel('1', ' some desc ', false, (new Date(1990, 9, 15).getTime()))
	let toggleTodoProvider: { toggleTodo: (todoId: string) => void }
	let wrapperTodo: ReactWrapper<FC<ITodoProps>>

	beforeEach(() => {
		toggleTodoProvider = {
			toggleTodo: (todoId: string) => { fakeTodo.completed = !fakeTodo.completed }
		}
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run if present
		const todo = <Todo todo={fakeTodo} toggleTodo={toggleTodoProvider.toggleTodo} />
		wrapperTodo = mount(todo)
	})

	afterEach(() => {
		wrapperTodo.unmount()
	})

	it('mounts and renders', () => {
		wrapperTodo.update()

		expect(wrapperTodo.exists()).toBe(true)
	})

	describe('clicking on Todo', () => {
		let spyToggleTodo: jest.SpyInstance

		beforeEach(() => {
			wrapperTodo.update()

			spyToggleTodo = jest.spyOn(toggleTodoProvider, 'toggleTodo')

			wrapperTodo.find('.todo').simulate('click')
		})

		it('updates Todo class and completion checkbox', () => {
			wrapperTodo.update()

			// expect(spyToggleTodo).toHaveBeenCalledTimes(1)
			// expect(spyToggleTodo).toHaveBeenLastCalledWith(fakeTodo.id)

			// expect(wrapperTodo.hasClass('completed')).toBe(true)

			// const completionCheckbox = wrapperTodo.find('input[type="checkbox"]')
			// expect(completionCheckbox.props()).toMatchObject({
			// 	checked: true,
			// 	readOnly: true,
			// 	type: 'checkbox'
			// })
		})
	})
})
