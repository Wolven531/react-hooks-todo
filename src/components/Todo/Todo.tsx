import React from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import './Todo.css'

const dateFormatterOptions: Intl.DateTimeFormatOptions = {
	day: 'numeric',
	month: 'long',
	timeZone: 'UTC',
	timeZoneName: 'short',
	weekday: 'long',
	year: 'numeric'
}
const dateFormatter = new Intl.DateTimeFormat('en-US', dateFormatterOptions)

const Todo = ({
	todo,
	toggleTodo
}: {
	todo: TodoModel
	toggleTodo: (todoId: string) => void
}) => {
	// const rtf = new Intl.RelativeTimeFormat('en', {
	// 	localeMatcher: 'best fit',// other values: 'lookup'
	// 	numeric: 'always',// other values: 'auto'
	// 	style: 'long'// other values: 'short' or 'narrow'
	// })
	
	return (
		<div className={['todo', todo.completed ? 'completed' : ''].join(' ')}
			onClick={() => { toggleTodo(todo.id) }}>
			<input
				type="checkbox"
				checked={todo.completed}
				readOnly={true}
			/>
			<p className="description">{todo.description}</p>
			<div className="creation">{dateFormatter.format(todo.creationTimestamp)}</div>
		</div>
	)
}

export { Todo }
