import React, { FC } from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import { prettifyTimestamp } from '../utils'

import './Todo.scss'

interface ITodoProps {
	todo: TodoModel
	toggleTodo: (todoId: string) => void
}

const Todo: FC<ITodoProps> = ({ todo, toggleTodo }) => {
	return (
		<div className={['todo', todo.completed ? 'completed' : ''].join(' ')}
			onClick={() => { toggleTodo(todo.id) }}>
			<input type="checkbox" checked={todo.completed} readOnly={true} />
			<p className="description">{todo.description}</p>
			<div className="creation">{prettifyTimestamp(todo.creationTimestamp)}</div>
		</div>
	)
}

export { Todo }
