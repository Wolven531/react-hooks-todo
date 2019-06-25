import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// models
import { Critter as CritterModel } from '../../model/Critter'

// local
import { Critter } from './Critter'

configure({ adapter: new Adapter() })

describe('Shallow render Critter component', () => {
	let fixtureCritter = new CritterModel('George', 100, 5, 3)
	let wrapperCritter: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperCritter = shallow(<Critter critter={fixtureCritter} />)
	})

	it('shallow renders WebSocketClient, MoneyControls, and CritterList', () => {
		wrapperCritter.update()

		expect(wrapperCritter.exists()).toBe(true)
		expect(wrapperCritter.hasClass('critter')).toBe(true)

		const critterTable = wrapperCritter.find('table')
		const nameRow = critterTable.find('tr').first()
		const hitpointsRow = critterTable.find('tr').at(1)
		const attackRow = critterTable.find('tr').at(2)
		const defenseRow = critterTable.find('tr').at(3)

		expect(nameRow.find('td').map(td => td.text())).toEqual(['Name', fixtureCritter.name])
		expect(hitpointsRow.find('td').map(td => td.text())).toEqual(['HP', String(fixtureCritter.hitpoints)])
		expect(attackRow.find('td').map(td => td.text())).toEqual(['Attack', String(fixtureCritter.attack)])
		expect(defenseRow.find('td').map(td => td.text())).toEqual(['Defense', String(fixtureCritter.defense)])
	})

	// describe('clicking critter', () => {
	// 	beforeEach(() => {
	// 		wrapperCritter.update()
	// 	})
	// })
})
