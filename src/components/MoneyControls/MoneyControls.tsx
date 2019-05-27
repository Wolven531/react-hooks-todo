import React, { useEffect } from 'react'

import './MoneyControls.css'

interface IMoneyControlsProps {
	addMoney: () => void
	money: number
}

const MoneyControls = ({ addMoney, money }: IMoneyControlsProps) => {
	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// console.info(`About to render`)

	return (
		<article className="money-controls">
			<p>Money: ${money.toFixed(2)}</p>
			<button onClick={() => { addMoney() }}>Add Money</button>
		</article>
	)
}

export { MoneyControls }
