import React, { useState } from 'react'

import { TodoModel } from './TodoModel'

const TodoForm = ({
	addTodo
}: {
	addTodo: (newTodo: TodoModel) => void
}) => {
	const [todo, setTodo] = useState('')
	// const clearCompletedTodos = () => {
	// 	setTodos(todos.filter(todo => !todo.completed))
	// }

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		addTodo(new TodoModel(-1, todo))
	}

	return (
		<form>
			<input
				type="text"
				name="new-todo"
				placeholder="Enter a new task"
				onChange={evt => {
					setTodo(evt.currentTarget.value)
				}}
				value={todo}
			/>
			<button onClick={handleClick}>Add new task</button>
			{/*
			<button onClick={clearCompletedTodos}>
				Remove completed tasks
			</button>
			*/}
		</form>
	)
}

export { TodoForm }
