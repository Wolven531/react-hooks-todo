import React, { useEffect, useState } from 'react'

import { useInterval } from '../../hooks/useInterval'

import { UpgradeStore } from '../../state/upgradeStore'
import { GATHERER_COST } from '../../state/useMoneyState'

import './MoneyControls.css'

const GATHERER_INITIAL_TICK = 0
const GATHERER_TICK_RATE = 10
const GATHERER_TIME_SECONDS = 2

interface IMoneyControlsProps {
	addGatherer: () => void
	addMoney: () => void
	collectFromGatherers: (gathererLevel?: number) => void
	gatherers: number
	money: number
	upgradeStore: UpgradeStore
}

const MoneyControls = ({ addGatherer, addMoney, collectFromGatherers, gatherers, money, upgradeStore }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	const handleBuyGatherer = () => {
		addGatherer()
	}

	useInterval(() => {
		if (gatherers < 1) {
			return
		}
		if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			setGathererTick(GATHERER_INITIAL_TICK)
			collectFromGatherers(upgradeStore.getGathererLevel())
			return
		}
		setGathererTick(gathererTick + 1)
	}, 1000 / GATHERER_TICK_RATE)

	return (
		<article className="money-controls">
			<section>
				<p>Money: ${money.toFixed(2)}</p>
				{gatherers < 1
					? null
					: <article>
						Gatherers: {gatherers}
						<progress value={gathererTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
					</article>}
				<article>
					<p>Gatherer Level: {upgradeStore.getGathererLevel()}</p>
					<button onClick={() => {upgradeStore.upgradeGatherers()}}>Upgrade Gatherers</button>
				</article>
				<button onClick={() => { addMoney() }}>Add Money</button>
			</section>
			<section>
				<button disabled={money < GATHERER_COST} onClick={handleBuyGatherer}>Buy Gatherer ({GATHERER_COST})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
