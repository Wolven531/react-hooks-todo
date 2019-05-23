import React, { useEffect } from 'react'

import { CritterList } from '../CritterList/CritterList'
import { TodoList } from '../TodoList/TodoList'

import { useMoneyState } from '../../state/useMoneyState'
import { useTodoState } from '../../state/useTodoState'

import './App.css'

const App = () => {
	const { addTodo, clearCompletedTodos, loadFromStorage, todos, toggleTodo } = useTodoState([])
	const { addMoney, money } = useMoneyState(0)

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Todo Manager'
		loadFromStorage()

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
			<h1>To Do</h1>
			<TodoList
				todos={todos}
				addTodo={addTodo}
				clearCompletedTodos={clearCompletedTodos}
				toggleTodo={toggleTodo}
			/>
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
