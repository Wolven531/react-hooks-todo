import React from 'react'

import { Todo } from './Todo'
import { TodoModel } from './TodoModel'

import './TodoList.css'

const TodoList = ({
	todos,
	toggleTodo
}: {
	toggleTodo: (todoId: number) => void
	todos: TodoModel[]
}) => {
	return (
		<div className="todo-list">
			{todos.length === 0 && <div>No todos are saved</div>}
			{todos.map((todo, index) => (
				<Todo key={index} todo={todo} toggleTodo={toggleTodo} />
			))}
		</div>
	)
}

export { TodoList }