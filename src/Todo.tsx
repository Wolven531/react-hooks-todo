import React from 'react'

import { TodoModel } from './TodoModel'

const Todo = ({
	setTodos,
	todo
}: {
	setTodos: (allTodos: TodoModel[]) => void
	todo: TodoModel
}) => {
	return (
		<div>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => {
					todo.completed = !todo.completed
				}}
			/>
			<p>{todo.description}</p>
		</div>
	)
}

export { Todo }
