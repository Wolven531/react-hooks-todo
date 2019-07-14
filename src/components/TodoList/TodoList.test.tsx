import {
	configure,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { ITodoListProps, TodoList } from './TodoList'

configure({ adapter: new Adapter() })

describe('Shallow render TodoList component', () => {
	let wrapperTodoList: ShallowWrapper<FC<ITodoListProps>>

	beforeEach(() => {
		wrapperTodoList = shallow(<TodoList
			addTodo={jest.fn()}
			clearCompletedTodos={jest.fn()}
			todos={[]}
			toggleTodo={jest.fn()} />)
		wrapperTodoList.update()
	})

	it('shallow renders properly', () => {
		expect(wrapperTodoList.exists()).toBe(true)
	})
})
