import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'

import { load } from 'cheerio'
// import { shallow } from 'enzyme'

import App from './App'

describe('Todo App component', () => {
	let fixture: ReactElement
	let parentDiv: HTMLElement

	beforeAll(() => {
		fixture = <App/>
		parentDiv = document.createElement('div')
		ReactDOM.render(fixture, parentDiv)
	})

	it('renders without crashing', () => {
		const $ = load(parentDiv.outerHTML)
		expect($('.app').length).toBe(1)
	})

	afterAll(() => {
		ReactDOM.unmountComponentAtNode(parentDiv)
	})
})
