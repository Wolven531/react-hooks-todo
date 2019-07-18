import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'
import { Link, Route } from 'react-router-dom'

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
import { Todo } from '../../model/Todo';

configure({ adapter: new Adapter() })

describe('Shallow render App component', () => {
	let wrapperApp: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperApp = shallow(<App/>)
		wrapperApp.update()
	})

	it('shallow renders Link and Routes (home and 404)', () => {
		expect(wrapperApp.exists()).toBe(true)

		const todoLink = wrapperApp.find(Link)

		expect(todoLink.props()).toMatchObject({ to: '/' })

		const routes = wrapperApp.find(Route)
		expect(routes).toHaveLength(2)
		expect(routes.first().props()).toMatchObject({
			exact: true,
			path: '/'
		})
		expect(routes.first().props().render).toBeDefined()
		expect(routes.at(1).props().render).toBeDefined()
	})
})

describe('Mount and render App component w/o localStorage', () => {
	// let spyComponentDidMount
	let originalLocalStorage: Storage
	let wrapperApp: ReactWrapper<FC>

	beforeEach(() => {
		originalLocalStorage = window.localStorage

		delete (window as any).localStorage
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		// wrapperApp = mount(<App/>)
		const app = <App/>
		// spyComponentDidMount = spyOn(app, 'componentDidMount')
		wrapperApp = mount(app)
		wrapperApp.update()
	})

	afterEach(() => {
		wrapperApp.unmount(); // NOTE: semi is needed due to next line syntax
		(window as any).localStorage = originalLocalStorage
	})

	// TODO: test this in integration test
	// describe('navigate to unknown location', () => {
	// 	beforeEach(() => {
	// 		// NOTE: attempt 1
	// 		// window.document.location.replace('/asdf')

	// 		// NOTE: attempt 2
	// 		// const router = wrapperApp.find(Router);// NOTE: semi needed for next line
	// 		// (router.context as any).history.push('/asdf')

	// 		// NOTE: attempt 3
	// 		// window.history.pushState(null, '/asdf', '/asdf')
	// 	})

	// 	it('renders "Page Not Found" route properly', () => {
	// 		const pageNotFoundRoute = wrapperApp.find(Route).last()
	// 		expect(pageNotFoundRoute.text()).toBe('Page not found')
	// 	})
	// })

	it('mounts and renders TodoList', () => {
		// expect(spyComponentDidMount).toHaveBeenCalled()
		const todoList = wrapperApp.find(TodoList)

		expect(todoList.exists()).toBe(true)
		expect(todoList.props().todos).toHaveLength(0)

		expect(document.title).toBe('Todo Manager')
	})
})

describe('Mount and render App component w/ non-empty localStorage', () => {
	const fakeCompleteTodo = new Todo('1', 'desc 1', true, 1)
	const fakeIncompleteTodo = new Todo('2', 'desc 2', false, 2)
	let mockLocalStorage: { getItem: (key: string) => string | null }
	let originalLocalStorage: Storage
	let wrapperApp: ReactWrapper<FC>

	beforeEach(() => {
		originalLocalStorage = window.localStorage

		mockLocalStorage = { getItem: jest.fn(() => JSON.stringify([fakeCompleteTodo, fakeIncompleteTodo])) }; // NOTE: semi is needed due to next line syntax
		(window as any).localStorage = mockLocalStorage

		const app = <App/>
		wrapperApp = mount(app)
		wrapperApp.update()
	})

	afterEach(() => {
		wrapperApp.unmount(); // NOTE: semi is needed due to next line syntax
		(window as any).localStorage = originalLocalStorage
	})

	it('mounts and renders TodoList w/ Todo items', () => {
		const todoList = wrapperApp.find(TodoList)

		expect(todoList.exists()).toBe(true)
		expect(todoList.props().todos).toEqual([fakeCompleteTodo, fakeIncompleteTodo])
	})
})
