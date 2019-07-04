import {
	configure,
	mount,
	ReactWrapper,
	shallow,
	ShallowWrapper
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { FC } from 'react'

// import { useCritterState } from '../../state/useCritterState'

// import { Critter } from '../../model/Critter'
import { CritterList, ICritterListProps } from './CritterList'

configure({ adapter: new Adapter() })

describe('Shallow render CritterList', () => {
	let wrapperCritterListPage: ShallowWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		wrapperCritterListPage = shallow(<CritterList currentMoney={0} />)
		wrapperCritterListPage.hasClass('critter-list')

		const displayContainer = wrapperCritterListPage.find('.display-container')
		expect(displayContainer.exists()).toBe(true)
		expect(displayContainer.children()).toHaveLength(0)
	})

	it('shallow renders CritterList w/ no issues', () => {
		wrapperCritterListPage.update()

		expect(wrapperCritterListPage.exists()).toBe(true)
	})
})

describe('Mount and render CritterList', () => {
	let mockLoadFromStorage: jest.Mock
	let mockedUseCritterState: jest.Mock
	let wrapperCritterListPage: ReactWrapper<FC<ICritterListProps>>

	beforeEach(() => {
		mockLoadFromStorage = jest.fn()
		mockedUseCritterState = jest.fn(() => {
			return {
				loadFromStorage: mockLoadFromStorage
			}
		})
		// mockedUseCritterState = jest.genMockFromModule('../../state/useCritterState')
		// mockedUseCritterState.mockImplementation(jest.fn())
		// jest.mock('../../state/useCritterState', () => {
		// 	return (initialValue: Critter[]) => {
		// 		return {
		// 			loadFromStorage: mockLoadFromStorage
		// 		}
		// 	}
		// })
		// jest.mock('../../state/useCritterState')
		// useCritterState = jest.fn()
		jest.mock('../../state/useCritterState', () => {
			return mockedUseCritterState
		})
		wrapperCritterListPage = mount(<CritterList currentMoney={0} />)
		wrapperCritterListPage.hasClass('critter-list')

		const displayContainer = wrapperCritterListPage.find('.display-container')
		expect(displayContainer.exists()).toBe(true)
		expect(displayContainer.children()).toHaveLength(0)
	})

	it('mounts and renders CritterList w/ no issues', () => {
		wrapperCritterListPage.update()

		expect(wrapperCritterListPage.exists()).toBe(true)
		// expect(jest.isMockFunction(useCritterState)).toBe(true)
		// expect(mockLoadFromStorage).toHaveBeenCalledTimes(1)
		// expect(mockedUseCritterState).toHaveBeenCalledTimes(1)
		// expect(mockedUseCritterState).toHaveBeenLastCalledWith([])
	})

	afterAll(() => {
		wrapperCritterListPage.unmount()
	})
})
