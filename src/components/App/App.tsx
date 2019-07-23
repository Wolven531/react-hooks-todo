import React, { FC, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from 'react-router-dom'

import { useTodoState } from '../../state/useTodoState'

import { PageNotFound } from '../PageNotFound/PageNotFound'
import { TodoList } from '../TodoList/TodoList'

import './App.scss'

const App: FC = () => {
	const todoState = useTodoState([])
	const { addTodo, clearCompletedTodos, loadFromStorage, todos, toggleTodo } = todoState

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => { }

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Todo Manager'

		loadFromStorage()

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// console.info(`About to render`)

	return (
		<article className="app">
			<Router>
				<Link to="/">Manage Todos</Link>
				<Switch>
					<Route exact={true} path="/" render={() =>
						<TodoList
							addTodo={addTodo}
							clearCompletedTodos={clearCompletedTodos}
							todos={todos}
							toggleTodo={toggleTodo} />}
					/>
					<Route>
						<PageNotFound />
					</Route>
				</Switch>
			</Router>
		</article>
	)
}

export default App
