import React, { Component } from 'react'

import { TodoList } from '../components/TodoList/TodoList'

import { ITodoState, useTodoState } from '../state/useTodoState'

// import './CritterList.scss'

class ManageTodos extends Component<{}, { todoState: ITodoState }> {
	public componentDidMount() {
		this.setState({ todoState: useTodoState([]) })
	}

	// const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	// useEffect(() => {
	// 	loadFromStorage()
	// }, [])

	public render() {
		const { todoState } = this.state

		const {
			addTodo,
			clearCompletedTodos,
			// deleteTodo,
			// loadFromStorage,
			todos,
			toggleTodo
		} = todoState

		return (
			<div className="manage-todos">
				<h1>Manage Todos</h1>
				<TodoList
					addTodo={addTodo}
					clearCompletedTodos={clearCompletedTodos}
					todos={todos}
					toggleTodo={toggleTodo} />
			</div>
		)
	}
}

export { ManageTodos }
