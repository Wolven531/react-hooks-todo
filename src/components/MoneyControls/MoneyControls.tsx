import React, { useEffect, useState } from 'react'

import './MoneyControls.css'

const GATHERER_COST = 10

interface IMoneyControlsProps {
	addGatherer: () => void
	addMoney: () => void
	gatherers: number
	money: number
}

const MoneyControls = ({ addGatherer, addMoney, gatherers, money }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(0)

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		return handleUnmount
	}

	const handleBuyGatherer = () => {
		addGatherer()
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	useEffect(() => {
		console.log(`[effect | MoneyControls] Should run only w/ change gathererTick=${gathererTick}`)
	}, [gathererTick])

	// console.info(`About to render`)

	return (
		<article className="money-controls">
			<section>
				<p>Money: ${money.toFixed(2)}</p>
				{gatherers > 0
					? <article>
						Gatherers: {gatherers}
						<progress value={gathererTick} />
						</article>
					: null}
				<button onClick={() => { addMoney() }}>Add Money</button>
			</section>
			<section>
				<button disabled={money < GATHERER_COST} onClick={handleBuyGatherer}>Buy Gatherer ({GATHERER_COST})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
