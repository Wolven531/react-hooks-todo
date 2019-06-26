import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'
import { v1 } from 'uuid'

// models
import { Critter as CritterModel } from '../../model/Critter'

// local
import { CritterListControls } from './CritterListControls'

configure({ adapter: new Adapter() })

const fixtureCritter = new CritterModel('George', 100, 5, 3)
const fixtureCritterWithId = new CritterModel('George', 100, 5, 3, v1())

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

		expect(wrapperCritterListControls.exists()).toBe(true)
		expect(wrapperCritterListControls.hasClass('critter-list-controls')).toBe(true)
	})
})

describe('Mount and render CritterListControls component', () => {
	let wrapperCritterListControls: ReactWrapper<FC>

	beforeEach(() => {
		// NOTE: need mount (rather than shallow) so that stateless componentDidMount will run
		const critterListControls = <CritterListControls
			canStartCombat={false}
			clearCritters={() => { return }}
			saveToLocalStorage={() => { return }}
			shouldShowCombat={false}
			spawnCritter={() => { return }}
			startCombat={() => { return }} />
		wrapperCritterListControls = mount(critterListControls)
	})

	afterEach(() => {
		wrapperCritterListControls.unmount()
	})

	it('mounts and renders', () => {
		wrapperCritterListControls.update()

		expect(wrapperCritterListControls.exists()).toBe(true)
	})
})
