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

	const handleUnmount = () => {}// happens before un-render (only once)

	const handleMounted = () => {// happens after render (only once)
		loadFromStorage()

		return handleUnmount
	}

	useEffect(handleMounted, [])// empty (no arg) to track nothing, just fire on mount/unmount

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
