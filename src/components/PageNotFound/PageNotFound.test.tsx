import {
	configure,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// components
import { PageNotFound } from '../PageNotFound/PageNotFound'

configure({ adapter: new Adapter() })

describe('Shallow render PageNotFound component', () => {
	let wrapperPageNotFound: ShallowWrapper<FC>

	beforeEach(() => {
		wrapperPageNotFound = shallow(<PageNotFound/>)
		wrapperPageNotFound.update()
	})

	it('shallow renders PageNotFound with proper message', () => {
		expect(wrapperPageNotFound.text()).toBe('Page not found')
	})
})
