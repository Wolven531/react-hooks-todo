import { configure, shallow, ShallowWrapper } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

import { CritterList, ICritterListProps } from './CritterList'

configure({ adapter: new Adapter() })

describe('CritterList unit test', () => {
	let wrapperCritterListPage: ShallowWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		wrapperCritterListPage = shallow(<CritterList currentMoney={0} />)
	})

	it('should shallow render CritterList', () => {
		wrapperCritterListPage.update()

		expect(wrapperCritterListPage.exists()).toBe(true)
	})
})
