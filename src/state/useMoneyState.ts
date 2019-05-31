import { useState } from 'react'

const GATHERER_COST = 10
const GATHERER_INCOME = 1

const useMoneyState = (initialValue: number) => {
	const [money, setMoney] = useState(initialValue)
	const [gatherers, setGatherers] = useState(0)

	const addMoney = (additionalFunds: number = 1) => {
		setMoney(money => money + additionalFunds)
	}

	return {
		gatherers,
		money,
		addGatherer: () => {
			// TODO: research if multiple setSTATE_VAR() calls is bad practice
			setMoney(money => money - GATHERER_COST)
			setGatherers(gatherers => gatherers + 1)
		},
		addMoney,
		collectFromGatherers: (gathererLevel = 1) => {
			addMoney(gatherers * GATHERER_INCOME * gathererLevel)
		}
	}
}

export { useMoneyState, GATHERER_COST }
