import { useState } from 'react'

const GATHERER_COST = 10

const useMoneyState = (initialValue: number) => {
	const [money, setMoney] = useState(initialValue)
	const [gatherers, setGatherers] = useState(0)

	return {
		gatherers,
		money,
		addGatherer: () => {
			// TODO: research if multiple setSTATE_VAR() calls is bad practice
			setMoney(money => money - GATHERER_COST)
			setGatherers(gatherers => gatherers + 1)
		},
		addMoney: () => {
			setMoney(money => money + 1)
		}
	}
}

export { useMoneyState, GATHERER_COST }
