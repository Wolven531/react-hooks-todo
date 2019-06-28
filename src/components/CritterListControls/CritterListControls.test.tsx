/* eslint-env jest */
/* globals jest */
/* tslint-env jest */
/* tslint jest */
import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import jest from 'jest'
// import jest = require('jest')
// import * as jest from 'jest'
// const jest = require('jest')
import React, { FC } from 'react'

// models

// local
import { CritterListControls } from './CritterListControls'

configure({ adapter: new Adapter() })

describe('Shallow render CritterListControls component', () => {
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={false}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={false}
			spawnCritter={() => { return }}
			startCombat={() => { return }} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(false)
		expect(wrapperCritterListControls.exists()).toBe(true)
		expect(wrapperCritterListControls.hasClass('critter-list-controls')).toBe(true)
	})
})

describe('Shallow render CritterListControls component w/ combat shown but disabled', () => {
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={false}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={() => { return }} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(true)
		expect(combatButton.text()).toBe('Start Combat (100)')
		expect(combatButton.props().disabled).toBe(true)
	})
})

describe('Shallow render CritterListControls component w/ combat shown and enabled', () => {
	let wrapperCritterListControls: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritterListControls = shallow(<CritterListControls
			canStartCombat={true}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={() => { return }} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, CritterList, and Critter details', () => {
		wrapperCritterListControls.update()

		const combatButton = wrapperCritterListControls.find('button.combat')

		expect(combatButton.exists()).toBe(true)
		expect(combatButton.text()).toBe('Start Combat (100)')
		expect(combatButton.props().disabled).toBe(false)
	})
})

describe('Mount and render CritterListControls component w/ combat shown and enabled', () => {
	let mockStartCombat: any
	let wrapperCritterListControls: ReactWrapper<FC>

	beforeEach(() => {
		mockStartCombat = jest.fn()
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		const critterListControls = <CritterListControls
			canStartCombat={true}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={true}
			spawnCritter={() => { return }}
			startCombat={mockStartCombat} />
		wrapperCritterListControls = mount(critterListControls)
	})

	afterEach(() => {
		wrapperCritterListControls.unmount()
	})

	it('mounts and renders', () => {
		wrapperCritterListControls.update()

		expect(wrapperCritterListControls.exists()).toBe(true)
	})

	describe('clicking combat button', () => {
		beforeEach(() => {
			wrapperCritterListControls.update()

			const combatButton = wrapperCritterListControls.find('button.combat')

			combatButton.simulate('click')
		})

		it('should call startCombat', () => {
			expect(mockStartCombat).toHaveBeenCalledTimes(1)
		})
	})
})
