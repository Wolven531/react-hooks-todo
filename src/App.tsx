import React, { useEffect, useState } from 'react'

import uuidv1 from 'uuid/v1'
import moment from 'moment'

import { TodoList } from './TodoList'
import { TodoModel } from './TodoModel'

import './App.css'

const App = () => {
	const [todos, setTodos] = useState<TodoModel[]>([
		new TodoModel(uuidv1(), 'default todo task 1', false, moment.now())
	])

	const addTodo = (todo: TodoModel) => {
		if (todo.id === '') {
			todo.id = uuidv1()
		}
		setTodos([...todos, todo])
	}

	const clearCompletedTodos = () => {
		setTodos([...todos.filter(todo => !todo.completed)])
	}
	
	const toggleTodo = (todoId: string) => {
		setTodos(todos.map(todo => {
			if (todo.id === todoId) {
				todo.completed = !todo.completed
			}
			return todo
		}))
	}

	// const [money, setMoney] = useState(0)

	// const addMoney = () => {
	// 	setMoney(money + 1)
	// }

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
			<TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} clearCompletedTodos={clearCompletedTodos} />
			{/*
			<div>
				<p>Money: ${money.toFixed(2)}</p>
				<button onClick={() => { addMoney() }}>Add Money</button>
			</div>
			*/}
		</div>
	)
}

export default App
