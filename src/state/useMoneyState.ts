import { useState } from 'react'

const useMoneyState = (initialValue: number) => {
	const [money, setMoney] = useState(initialValue)
	const [gatherers, setGatherers] = useState(0)

	return {
		gatherers,
		money,
		addGatherer: () => {
			setGatherers(gatherers + 1)
		},
		addMoney: () => {
			setMoney(money + 1)
		}
	}
}

export { useMoneyState }
