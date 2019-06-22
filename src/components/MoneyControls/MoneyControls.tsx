import React, { useEffect, useState, MouseEvent } from 'react'

import { useInterval } from '../../hooks/useInterval'

import { UpgradeStore } from '../../state/upgradeStore'
import { GATHERER_COST, IMoneyState } from '../../state/useMoneyState'

import { Modal } from '../../components/Modal/Modal'

import './MoneyControls.scss'

const GATHERER_INITIAL_TICK = 0
const GATHERER_TICK_RATE = 10
const GATHERER_TIME_SECONDS = 2

interface IMoneyControlsProps {
	moneyState: IMoneyState
	upgradeStore: UpgradeStore
}

const MoneyControls = ({ moneyState, upgradeStore }: IMoneyControlsProps) => {
	const [gathererTick, setGathererTick] = useState(GATHERER_INITIAL_TICK)
	const [isShowingModal, setIsShowingModal] = useState(true)

	const { addGatherer, addMoney, calculateGathererIncome, collectFromGatherers, gatherers, money } = moneyState
	// TODO: research why do each of these funcs not have a `this` ???
	// const { gathererLevel, getGathererUpgradeCost, upgradeGatherers } = upgradeStore

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		const loadedInfo = moneyState.loadFromStorage()

		if (loadedInfo) {
			for (let a = 0; a < loadedInfo.gathererLevel; a++) {
				upgradeStore.upgradeGatherers()
			}
		}

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, fires on mount/unmount
	useEffect(handleMounted, [])

	const handleBuyGatherer = () => {
		addGatherer()
	}

	const handleModalDialogClose = () => {
		setIsShowingModal(false)
	}

	const handleUpgradeGatherers = () => {
		addMoney(-1 * upgradeStore.getGathererUpgradeCost())
		upgradeStore.upgradeGatherers()
	}

	const dateFormatOptions: Intl.DateTimeFormatOptions = {
		// day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		// month: 'long',
		second: 'numeric',
		timeZone: 'UTC',
		timeZoneName: 'short',
		// weekday: 'long',
		// year: 'numeric'
	}
	const dateFormatter = new Intl.DateTimeFormat('en-US', dateFormatOptions)
	const moneyFormatOptions: Intl.NumberFormatOptions = { currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0, style: 'currency' }

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

	useInterval(() => {
		// console.info(`[${dateFormatter.format(Date.now())}] saving money..., ${money}`)
		moneyState.saveToStorage(upgradeStore.gathererLevel)
	}, 1000)

	return (
		<article className="money-controls">
			{isShowingModal && (
			<Modal handleModalDialogClose={handleModalDialogClose}>
				<article>
					<h1>Welcome to Critter Manager!</h1>
				</article>
			</Modal>)}
			<section>
				<p>Money: {money.toLocaleString('en-US', moneyFormatOptions)}</p>
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
