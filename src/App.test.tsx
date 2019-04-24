import 'jest'
import React from 'react'
import { configure, mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import App from './App'

describe('Todo App component', () => {
	let fixture: ReactWrapper

	beforeAll(() => { })

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		fixture = mount(<App/>)
	})

	it('renders without crashing', () => {
		expect(fixture.find('.app').exists()).toBe(true)
		expect(localStorage.getItem).toHaveBeenCalled()
	})

	afterEach(() => { })
})
