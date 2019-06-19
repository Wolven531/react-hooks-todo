import React, { FC, useEffect } from 'react'

import { CritterList } from '../../views/CritterList/CritterList'
import { MoneyControls } from '../MoneyControls/MoneyControls'
import { WebSocketClient } from '../WebSocketClient/WebSocketClient'

import { UpgradeStore } from '../../state/upgradeStore'
import { useMoneyState } from '../../state/useMoneyState'

import './App.scss'

const App: FC = () => {
	const moneyState = useMoneyState(0)
	const upgradeStore = new UpgradeStore()

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Critter Manager'

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// console.info(`About to render`)

	return (
		<article className="app">
			<WebSocketClient />
			<MoneyControls moneyState={moneyState} upgradeStore={upgradeStore} />
			<CritterList currentMoney={moneyState.money} />
		</article>
	)
}

export default App
