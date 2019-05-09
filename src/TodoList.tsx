import React from 'react'

import { Todo as TodoModel } from './model/Todo'

import { Todo } from './Todo'
import { TodoForm } from './TodoForm'

import './TodoList.css'

const TodoList = ({
	addTodo,
	clearCompletedTodos,
	todos,
	toggleTodo
}: {
	addTodo: (todo: TodoModel) => void
	clearCompletedTodos: () => void
	todos: TodoModel[]
	toggleTodo: (todoId: string) => void
}) => {
	const saveTodos = () => {
		if (!window.localStorage) {
			alert('local storage not available, unable to save 😢')
			return
		}
		console.info('localStorage is available! saving todos...')
		window.localStorage.setItem('react-hooks-todo.todos', JSON.stringify(todos))
	}

	return (
		<div className="todo-list">
			<TodoForm addTodo={addTodo} />
			{todos.length === 0 && <div>No todos are saved</div>}
			<button onClick={() => { clearCompletedTodos() }}>Clear completed Todo items</button>
			<button onClick={() => { saveTodos() }}>Save Todo list</button>
			{todos.length > 0 && <React.Fragment>
				{todos.map((todo, index) => (
					<Todo key={index} todo={todo} toggleTodo={toggleTodo} />
				))}
			</React.Fragment>}
		</div>
	)
}

export { TodoList }
