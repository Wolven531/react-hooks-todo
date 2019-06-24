import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import { expect } from 'jasmine'
// import { spyOn } from 'jest'
// import {
// 	beforeEach,
// 	describe,
// 	it
// } from 'mocha'
import React, { FC } from 'react'

configure({ adapter: new Adapter() })

// components
import App from './App'
import { MoneyControls } from '../MoneyControls/MoneyControls'
import { WebSocketClient } from '../WebSocketClient/WebSocketClient'

// views
import { CritterList } from '../../views/CritterList/CritterList'

describe('Shallow render App component', () => {
	let wrapperApp: ShallowWrapper<FC>

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		wrapperApp = shallow(<App/>)
	})

	it('shallow renders WebSocketClient, MoneyControls, and CritterList', () => {
		wrapperApp.update()
		expect(wrapperApp.exists()).toBe(true)

		const webSocketClient = wrapperApp.find(WebSocketClient)
		expect(webSocketClient.exists()).toBe(true)

		const moneyControls = wrapperApp.find(MoneyControls)
		expect(moneyControls.exists()).toBe(true)

		const critterList = wrapperApp.find(CritterList)
		expect(critterList.exists()).toBe(true)
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

	it('mounts and renders WebSocketClient, MoneyControls, and CritterList', () => {
		// expect(spyComponentDidMount).toHaveBeenCalled()
		wrapperApp.update()
		expect(wrapperApp.exists()).toBe(true)

		const webSocketClient = wrapperApp.find(WebSocketClient)
		expect(webSocketClient.exists()).toBe(true)

		const moneyControls = wrapperApp.find(MoneyControls)
		expect(moneyControls.exists()).toBe(true)

		const critterList = wrapperApp.find(CritterList)
		expect(critterList.exists()).toBe(true)

		expect(document.title).toBe('Critter Manager')
	})
})
