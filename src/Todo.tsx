import React from 'react'
import moment from 'moment'

import { TodoModel } from './TodoModel'

import './Todo.css'

const Todo = ({
	todo,
	toggleTodo
}: {
	todo: TodoModel
	toggleTodo: (todoId: string) => void
}) => {
	return (
		<div
			className={['todo', todo.completed ? 'completed' : ''].join(' ')}
			onClick={() => {
				toggleTodo(todo.id)
			}}>
			<input
				type="checkbox"
				checked={todo.completed}
				readOnly={true}
			/>
			<p className="description">{todo.description}</p>
			<div className="creation">{moment(todo.creationTimestamp).calendar()}</div>
		</div>
	)
}

export { Todo }
