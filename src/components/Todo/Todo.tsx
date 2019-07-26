import React, { FC } from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import { prettifyTimestamp } from '../utils'

import './Todo.scss'

export interface ITodoProps {
	deleteTodo: (todoId: string) => void
	todo: TodoModel
	toggleTodo: (todoId: string) => void
}

const Todo: FC<ITodoProps> = ({ deleteTodo, todo, toggleTodo }) => {
	return (
		<div className={['todo', todo.completed ? 'completed' : ''].join(' ')}
			onClick={() => { toggleTodo(todo.id) }}>
			<input type="checkbox" checked={todo.completed} readOnly={true} />
			<p className="description">{todo.description}</p>
			<div className="creation">{prettifyTimestamp(todo.creationTimestamp)}</div>
			<div className="delete" onClick={evt => {
				evt.stopPropagation()
				deleteTodo(todo.id)
			}}>X</div>
		</div>
	)
}

export { Todo }
