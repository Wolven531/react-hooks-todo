import React from 'react'

import { TodoModel } from './TodoModel'

const TodoForm = ({
	setTodo,
	setTodos,
	todo,
	todos
}: {
	setTodo: (newTodo: string) => void
	setTodos: (allTodos: TodoModel[]) => void
	todo: string
	todos: TodoModel[]
}) => {
	const clearCompletedTodos = () => {
		setTodos(todos.filter(todo => !todo.completed))
	}
	const handleAddTodo = () => {
		setTodos([...todos, new TodoModel(todos.length, todo)])
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
			<button onClick={handleAddTodo}>Add new task</button>
			<button onClick={clearCompletedTodos}>
				Remove completed tasks
			</button>
		</form>
	)
}

export { TodoForm }
