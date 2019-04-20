import React, { useEffect, useState } from 'react'

import moment from 'moment'

import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { TodoModel } from './TodoModel'

import './App.css'

const App = () => {
	const [todos, setTodos] = useState<TodoModel[]>([
		new TodoModel(0, 'todo task 1', false, moment.now())
	])
	const [money, setMoney] = useState(0)

	const addTodo = (todo: TodoModel) => {
		if (todo.id === -1) {
			todo.id = todos.length
		}
		setTodos([...todos, todo])
	}

	const addMoney = () => {
		setMoney(money + 1)
	}

	const toggleTodo = (todoId: number) => {
		setTodos(todos.map(todo => {
			if (todo.id === todoId) {
				todo.completed = !todo.completed
			}
			return todo
		}))
	}

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Todo Manager'

		if (window.localStorage) {
			console.info('localStorage is available! loading todos...')
			const storedTodoStr = window.localStorage.getItem('react-hooks-todo.todos')
			if (storedTodoStr && storedTodoStr.length) {
				setTodos(JSON.parse(storedTodoStr))
			}
		}

		return handleUnmount
	}

	const saveTodos = () => {
		if (!window.localStorage) {
			alert('local storage not available, unable to save 😢')
			return
		}
		console.info('localStorage is available! saving todos...')
		window.localStorage.setItem('react-hooks-todo.todos', JSON.stringify(todos))
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	// NOTE: track todos, fire on every change
	// useEffect(() => {
	// 	console.info(`Todos was changed: ${JSON.stringify(todos, null, 4)}`)
	// }, [todos])

	// console.info(`About to render`)

	return (
		<div className="app">
			<h1>To Do</h1>
			<TodoForm addTodo={addTodo} />
			<TodoList todos={todos} toggleTodo={toggleTodo} />
			<button onClick={() => { saveTodos() }}>Save Todo list</button>
			<div>
				<p>Money: ${money.toFixed(2)}</p>
				<button onClick={() => { addMoney() }}>Add Money</button>
			</div>
		</div>
	)
}

export default App
