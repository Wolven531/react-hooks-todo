import React, { useEffect } from 'react'

import { CritterList } from '../../views/CritterList/CritterList'
import { MoneyControls } from '../MoneyControls/MoneyControls'

import { UpgradeStore } from '../../state/upgradeStore'
import { useMoneyState } from '../../state/useMoneyState'

import './App.scss'

const App = () => {
	const moneyState = useMoneyState(0)
	const upgradeStore = new UpgradeStore()

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Critter Manager'

		// NOTE: create socket to echo server (use secure protocol, i.e. `wss` not `ws`)
		const secureWebSocketProto = 'wss://'
		const webSocketClient = new WebSocket(`${secureWebSocketProto}localhost:5001/ws`)

		webSocketClient.onopen = evt => {
			const webSocketTarget: WebSocket = evt.target as WebSocket
			console.log('web socket is opened! sending message to server...')
			// NOTE: send message to server
			webSocketTarget.send('ello!!!')
		}

		webSocketClient.onmessage = evt => {
			const { data, target, type } = evt
			const webSocketTarget: WebSocket = target as WebSocket
			console.log(`message received from="${webSocketTarget.url}" type="${type}" data="${data}"`)
		}

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// console.info(`About to render`)

	return (
		<article className="app">
			<MoneyControls moneyState={moneyState} upgradeStore={upgradeStore} />
			<CritterList currentMoney={moneyState.money} />
		</article>
	)
}

export default App
