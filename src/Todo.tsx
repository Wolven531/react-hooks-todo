import React from 'react'

import { TodoModel } from './TodoModel'

import './Todo.css'

const Todo = ({
	todo,
	toggleTodo
}: {
	todo: TodoModel
	toggleTodo: (todoId: number) => void
}) => {
	return (
		<div className={['todo', todo.completed ? 'completed' : ''].join(' ')}>
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
