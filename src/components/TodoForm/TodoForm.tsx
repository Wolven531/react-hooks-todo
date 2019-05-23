import React, { useState } from 'react'

import moment from 'moment'

import { Todo } from './model/Todo'

const TodoForm = ({
	addTodo
}: {
	addTodo: (newTodo: Todo) => void
}) => {
	const [todo, setTodo] = useState('')
	// const clearCompletedTodos = () => {
	// 	setTodos(todos.filter(todo => !todo.completed))
	// }

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		if (todo.length < 1) {
			alert('Todo must have a description')
			return
		}
		addTodo(new Todo('', todo, false, moment.now()))
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
