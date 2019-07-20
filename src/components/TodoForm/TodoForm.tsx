import React, { FC, useState } from 'react'

import { v1 } from 'uuid'
import moment from 'moment'

import { Todo } from '../../model/Todo'

export interface ITodoFormProps {
	addTodo: (newTodo: Todo) => void
}

const TodoForm: FC<ITodoFormProps> = ({ addTodo }) => {
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
		addTodo(new Todo(v1(), todo, false, moment.now()))
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
		</form>
	)
}

export { TodoForm }
