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
})
