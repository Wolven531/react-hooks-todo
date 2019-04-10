import React, { useState } from 'react'

import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { TodoModel } from './TodoModel'

import './App.css'

const App = () => {
	const [todos, setTodos] = useState<TodoModel[]>([
		new TodoModel(0, 'todo task 1')
	])
	const [todo, setTodo] = useState('')

	return (
		<div className="app">
			<h1>To Do</h1>
			<TodoForm
				todos={todos}
				todo={todo}
				setTodo={setTodo}
				setTodos={setTodos}
			/>
			<TodoList setTodos={setTodos} todos={todos} />
		</div>
	)
}

export default App
