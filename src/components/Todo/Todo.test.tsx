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

describe('Shallow render incomplete Todo component', () => {
	const fakeIncompleteTodo = new TodoModel('1', ' some desc ', false, (new Date(1990, 9, 15).getTime()))
	let wrapperTodo: ShallowWrapper<FC<ITodoProps>>

	beforeEach(() => {
		wrapperTodo = shallow(<Todo deleteTodo={jest.fn()} todo={fakeIncompleteTodo} toggleTodo={jest.fn()} />)
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

describe('Shallow render completed Todo component', () => {
	const fakeCompletedTodo = new TodoModel('1', ' some desc ', true, (new Date(1990, 9, 15).getTime()))
	let wrapperTodo: ShallowWrapper<FC<ITodoProps>>

	beforeEach(() => {
		wrapperTodo = shallow(<Todo deleteTodo={jest.fn()} todo={fakeCompletedTodo} toggleTodo={jest.fn()} />)
	})

	it('shallow renders', () => {
		wrapperTodo.update()

		expect(wrapperTodo.exists()).toBe(true)
		expect(wrapperTodo.hasClass('todo')).toBe(true)
		expect(wrapperTodo.hasClass('completed')).toBe(true)

		expect(wrapperTodo.find('input[type="checkbox"]').props()).toMatchObject({
			checked: true,
			readOnly: true,
			type: 'checkbox'
		})
	})
})

describe('Mount and render Todo component', () => {
	const fakeTodo: TodoModel = new TodoModel('1', ' some desc ', false, (new Date(1990, 9, 15).getTime()))
	const mockDeleteTodo = jest.fn()
	const mockToggleTodo = jest.fn()
	let wrapperTodo: ReactWrapper<FC<ITodoProps>>

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run if present
		const todo = <Todo
			deleteTodo={mockDeleteTodo}
			todo={fakeTodo}
			toggleTodo={mockToggleTodo} />
		wrapperTodo = mount(todo)
		wrapperTodo.update()
	})

	afterEach(() => {
		wrapperTodo.unmount()
	})

	it('mounts and renders', () => {
		expect(wrapperTodo.exists()).toBe(true)
	})

	describe('clicking on Todo', () => {
		beforeEach(() => {
			wrapperTodo.simulate('click')
			wrapperTodo.update()
		})

		it('updates calls provided toggleTodo', () => {
			expect(mockToggleTodo).toHaveBeenCalledTimes(1)
			expect(mockToggleTodo).toHaveBeenLastCalledWith('1')
		})
	})

	describe('clicking on Todo delete', () => {
		beforeEach(() => {
			wrapperTodo.find('.delete').simulate('click')
			wrapperTodo.update()
		})

		it('updates calls provided deleteTodo', () => {
			expect(mockDeleteTodo).toHaveBeenCalledTimes(1)
			expect(mockDeleteTodo).toHaveBeenLastCalledWith('1')
		})
	})
})
