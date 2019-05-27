import React, { useEffect } from 'react'

import { CritterList } from '../../views/CritterList/CritterList'

import { useMoneyState } from '../../state/useMoneyState'

import './App.css'

const App = () => {
	const { addMoney, money } = useMoneyState(0)

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Critter Manager'

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// NOTE: track todos, fire on every change
	// useEffect(() => {
	// 	console.info(`Todos was changed: ${JSON.stringify(todos, null, 4)}`)
	// }, [todos])

	// console.info(`About to render`)

	return (
		<div className="app">
			<CritterList />
			{/*
			<div>
				<p>Money: ${money.toFixed(2)}</p>
				<button onClick={() => { addMoney() }}>Add Money</button>
			</div>
			*/}
		</div>
	)
}

export default App
