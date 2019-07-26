import React, { FC, useEffect } from 'react'

import { Todo as TodoModel } from '../../model/Todo'

import { Todo } from '../Todo/Todo'
import { TodoForm } from '../TodoForm/TodoForm'

import './TodoList.scss'

export interface ITodoListProps {
	addTodo: (todo: TodoModel) => void
	clearCompletedTodos: () => void
	deleteTodo: (todoId: string) => void
	todos: TodoModel[]
	toggleTodo: (todoId: string) => void
}

const TodoList: FC<ITodoListProps> = ({ addTodo, clearCompletedTodos, deleteTodo, todos, toggleTodo }) => {
	useEffect(() => {
		window.document.title = 'Todo Manager'
	}, [])// empty (no arg) to track nothing, just fire on mount/unmount

	const saveTodos = () => {
		if (!window.localStorage) {
			alert('local storage not available, unable to save 😢')
			return
		}
		// console.info('localStorage is available! saving todos...')
		window.localStorage.setItem('react-hooks-todo.todos', JSON.stringify(todos))
	}

	return (
		<div className="todo-list">
			<h1>Todo Manager</h1>
			<TodoForm addTodo={addTodo} />
			{todos.length > 0
				? <React.Fragment>
					<button className="clear" onClick={() => { clearCompletedTodos() }}>Clear completed Todo items</button>
					{todos.map((todo, index) => (
						<Todo key={index} deleteTodo={deleteTodo} todo={todo} toggleTodo={toggleTodo} />
					))}
				</React.Fragment>
				: <div className="empty-msg">No todos are saved</div>}
			<button className="save" onClick={() => { saveTodos() }}>Save Todo list</button>
		</div>
	)
}

export { TodoList }
