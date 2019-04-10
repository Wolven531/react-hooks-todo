import React from 'react'

import { Todo } from './Todo'
import { TodoModel } from './TodoModel'

const TodoList = ({
	setTodos,
	todos
}: {
	setTodos: (allTodos: TodoModel[]) => void
	todos: TodoModel[]
}) => {
	return (
		<div className="todo-list">
			{todos.length === 0 && <div>No todos are saved</div>}
			{todos.map((todo, index) => (
				<Todo key={index} todo={todo} setTodos={setTodos} />
			))}
		</div>
	)
}

export { TodoList }
