import React from 'react'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

import App from './App'

describe('Todo App component', () => {
	let fixture: ShallowWrapper
	let originalLocalStorage: Storage

	beforeAll(() => {
		originalLocalStorage = window.localStorage
		window.localStorage = jest.fn()
		fixture = shallow(<App/>)
	})

	it('renders without crashing', () => {
		expect(fixture.exists()).toBe(true)
		expect(fixture.hasClass('app')).toBe(true)
	})

	afterAll(() => {
		window.localStorage = originalLocalStorage
	})
})
