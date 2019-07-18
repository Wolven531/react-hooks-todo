import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// TODO: lookup how to import functions jasmine ???
// import { expect } from 'jasmine'

// TODO: lookup how to import functions from jest ???
// import { spyOn } from 'jest'

// TODO: lookup how to import functions from mocha ???
// import {
// 	beforeEach,
// 	describe,
// 	it
// } from 'mocha'

// components
import App from './App'
import { TodoList } from '../TodoList/TodoList'

configure({ adapter: new Adapter() })

describe('Shallow render App component', () => {
	let wrapperApp: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperApp = shallow(<App/>)
	})

	it('shallow renders WebSocketClient, MoneyControls, and CritterList', () => {
		wrapperApp.update()

		expect(wrapperApp.exists()).toBe(true)

		const todoList = wrapperApp.find(TodoList)

		expect(todoList.exists()).toBe(true)
	})
})

describe('Mount and render App component', () => {
	// let spyComponentDidMount
	let wrapperApp: ReactWrapper<FC>

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		// wrapperApp = mount(<App/>)
		const app = <App/>
		// spyComponentDidMount = spyOn(app, 'componentDidMount')
		wrapperApp = mount(app)
	})

	afterEach(() => {
		wrapperApp.unmount()
	})

	it('mounts and renders TodoList', () => {
		// expect(spyComponentDidMount).toHaveBeenCalled()
		wrapperApp.update()

		expect(wrapperApp.exists()).toBe(true)

		const todoList = wrapperApp.find(TodoList)

		expect(todoList.exists()).toBe(true)

		expect(document.title).toBe('Todo Manager')
	})
})
