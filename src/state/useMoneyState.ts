import { useState } from 'react'

const GATHERER_COST = 10
const GATHERER_INCOME = 1

interface IMoneyState {
	addGatherer: () => void
	addMoney: (additionalFunds?: number) => void
	calculateGathererIncome: (gathererLevel?: number) => number
	collectFromGatherers: (gathererLevel?: number) => void
	gatherers: number
	money: number
}

const useMoneyState = (initialValue: number): IMoneyState => {
	const [money, setMoney] = useState(initialValue)
	const [gatherers, setGatherers] = useState(0)

	const addMoney = (additionalFunds: number = 1) => {
		setMoney(money => money + additionalFunds)
	}

	const calculateGathererIncome = (gathererLevel = 1): number => gatherers * GATHERER_INCOME * (gathererLevel + 1)

	return {
		gatherers,
		money,
		addGatherer: () => {
			// TODO: research if multiple setSTATE_VAR() calls is bad practice
			setMoney(money => money - GATHERER_COST)
			setGatherers(gatherers => gatherers + 1)
		},
		addMoney,
		calculateGathererIncome,
		collectFromGatherers: (gathererLevel = 1) => {
			addMoney(calculateGathererIncome(gathererLevel))
		}
	}
}

export {
	IMoneyState,
	useMoneyState,
	GATHERER_COST
}
