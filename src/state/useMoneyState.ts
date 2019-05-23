import { useState } from 'react'

const useMoneyState = (initialValue: number) => {
	const [money, setMoney] = useState(initialValue)

	return {
		money,
		addMoney: () => {
			setMoney(money + 1)
		}
	}
}

export { useMoneyState }
