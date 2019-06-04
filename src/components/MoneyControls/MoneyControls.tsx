import React, { useEffect, useState, MouseEvent } from 'react'

import { useInterval } from '../../hooks/useInterval'

import { UpgradeStore } from '../../state/upgradeStore'
import { GATHERER_COST } from '../../state/useMoneyState'

import './MoneyControls.css'

const GATHERER_INITIAL_TICK = 0
const GATHERER_TICK_RATE = 10
const GATHERER_TIME_SECONDS = 2

interface IMoneyControlsProps {
	addGatherer: () => void
	addMoney: (additionalFunds?: number) => void
	calculateGathererIncome: (gathererLevel?: number) => number
	collectFromGatherers: (gathererLevel?: number) => void
	gatherers: number
	money: number
	upgradeStore: UpgradeStore
}

const MoneyControls = ({
	addGatherer,
	addMoney,
	calculateGathererIncome,
	collectFromGatherers,
	gatherers,
	money,
	upgradeStore }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

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

	const handleModalClick = (evt: MouseEvent) => {
		// TODO: figure out how to alert the user about the modal
		// const { currentTarget, target, preventDefault } = evt
		// preventDefault()
		// alert(`Must close the modal... ${(target as Element).classList}`)
	}

	const handleModalDialogClose = () => {
		setIsShowingModal(false)
	}

	const handleUpgradeGatherers = () => {
		addMoney(-1 * upgradeStore.getGathererUpgradeCost())
		upgradeStore.upgradeGatherers()
	}

	useInterval(() => {
		if (gatherers < 1) {
			return
		}
		if (gathererTick >= GATHERER_TIME_SECONDS * GATHERER_TICK_RATE) {
			setGathererTick(GATHERER_INITIAL_TICK)
			collectFromGatherers(upgradeStore.gathererLevel)
			return
		}
		setGathererTick(gathererTick + 1)
	}, 1000 / GATHERER_TICK_RATE)

	return (
		<article className="money-controls">
			{isShowingModal && <div onClick={handleModalClick} className="modal-container">
				<div className="modal">
					{false // TODO: this should be `isLoading`
						? <div>Spinner</div>
						: <div>
							<button onClick={handleModalDialogClose} className="close">X</button>
							<h1>Modal Dialog Content</h1>
						</div>}
				</div>
			</div>}
			<section>
				<p>Money: ${money.toFixed(2)}</p>
				{gatherers < 1
					? null
					: <article>
						Gatherers: {gatherers}
						<br/>
						Gatherer Level: {upgradeStore.gathererLevel}
						<br/>
						Gatherer Income = ${calculateGathererIncome(upgradeStore.gathererLevel)}
						<br/>
						<button className="upgrade"
							disabled={money < upgradeStore.getGathererUpgradeCost()}
							onClick={() => { handleUpgradeGatherers() }}>Upgrade Gatherers ({upgradeStore.getGathererUpgradeCost()})</button>
						<br/>
						<progress value={gathererTick} max={GATHERER_TIME_SECONDS * GATHERER_TICK_RATE} />
					</article>}
				<article>
					<button className="add-money"
						onClick={() => { addMoney() }}>Add Money</button>
				</article>
			</section>
			<section>
				<button className="buy-gatherer"
					disabled={money < GATHERER_COST}
					onClick={handleBuyGatherer}>Buy Gatherer ({GATHERER_COST})</button>
			</section>
		</article>
	)
}

export { MoneyControls }
