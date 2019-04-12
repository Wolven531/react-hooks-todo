import React from 'react'

import { TodoModel } from './TodoModel'

const Todo = ({
	todo,
	toggleTodo
}: {
	todo: TodoModel
	toggleTodo: (todoId: number) => void
}) => {
	return (
		<div>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => {
					toggleTodo(todo.id)
				}}
			/>
			<p>{todo.description}</p>
		</div>
	)
}

export { Todo }
