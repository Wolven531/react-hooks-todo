import React, { useState } from 'react'

import moment from 'moment'

import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { TodoModel } from './TodoModel'

import './App.css'

const App = () => {
	const [todos, setTodos] = useState<TodoModel[]>([
		new TodoModel(0, 'todo task 1', false, moment.now())
	])

	const addTodo = (todo: TodoModel) => {
		if (todo.id === -1) {
			todo.id = todos.length
		}
		setTodos([...todos, todo])
	}

	const toggleTodo = (todoId: number) => {
		setTodos(todos.map(todo => {
			if (todo.id === todoId) {
				todo.completed = !todo.completed
			}
			return todo
		}))
	}

	return (
		<div className="app">
			<h1>To Do</h1>
			<TodoForm addTodo={addTodo} />
			<TodoList todos={todos} toggleTodo={toggleTodo} />
		</div>
	)
}

export default App
