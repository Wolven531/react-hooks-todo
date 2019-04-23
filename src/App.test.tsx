// import React, { ReactElement } from 'react'
import React from 'react'
// import ReactDOM from 'react-dom'

// import { load } from 'cheerio'
// NOTE: cannot redeclare, because react-scripts does already
// const jest = require('jest')
// import './mock-local'
import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });
// import { after, before, describe, it } from 'mocha'
// import 'jest'

import App from './App'

describe('Todo App component', () => {
	let fixture: ShallowWrapper
	let originalLocalStorage: Storage
	let parentDiv: HTMLElement

	// before(() => {
	beforeAll(() => {
		originalLocalStorage = window.localStorage
		window.localStorage = jest.fn()
		fixture = shallow(<App/>)
		// parentDiv = document.createElement('div')
		// ReactDOM.render(fixture, parentDiv)
	})

	it('renders without crashing', () => {
		// const $ = load(parentDiv.outerHTML)
		// expect($('.app').length).toBe(1)
		expect(fixture.exists()).toBe(true)
	})

	// after(() => {
	afterAll(() => {
		// ReactDOM.unmountComponentAtNode(parentDiv)
		window.localStorage = originalLocalStorage
	})
})
