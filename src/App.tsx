import React, { useEffect, useState } from 'react'

import { TodoList } from './TodoList'
import { TodoModel } from './TodoModel'

import './App.css'

const useTodoState = (initialValue: TodoModel[]) => {
	const [todos, setTodos] = useState(initialValue)

	return {
		todos,
		addTodo: (newTodo: TodoModel) => {
			setTodos(todos.concat(newTodo))
		},
		clearCompletedTodos: () => {
			setTodos(todos.filter(todo => !todo.completed))
		},
		deleteTodo: (todoId: string) => {
			setTodos(todos.filter(todo => todo.id !== todoId))
		},
		loadFromStorage: () => {
			if (window.localStorage) {
				console.info('localStorage is available! loading todos...')
				const storedTodoStr = window.localStorage.getItem(
					'react-hooks-todo.todos'
				)
				if (storedTodoStr && storedTodoStr.length) {
					setTodos(JSON.parse(storedTodoStr))
				}
			}
		},
		toggleTodo: (todoId: string) => {
			setTodos(todos.map(todo => {
				if (todo.id === todoId) {
					todo.completed = !todo.completed
				}
				return todo
			}))
		}
	}
}

const App = () => {
	const { addTodo, clearCompletedTodos, loadFromStorage, todos, toggleTodo } = useTodoState([])
	// const [todos, setTodos] = useState<TodoModel[]>([
	// 	new TodoModel(uuidv1(), 'default todo task 1', false, moment.now())
	// ])

	// const addTodo = (todo: TodoModel) => {
	// 	if (todo.id === '') {
	// 		todo.id = uuidv1()
	// 	}
	// 	setTodos([...todos, todo])
	// }

	// const clearCompletedTodos = () => {
	// 	setTodos(todos.filter(todo => !todo.completed))
	// }

	// const toggleTodo = (todoId: string) => {
	// 	setTodos(todos.map(todo => {
	// 		if (todo.id === todoId) {
	// 			todo.completed = !todo.completed
	// 		}
	// 		return todo
	// 	}))
	// }

	// const [money, setMoney] = useState(0)

	// const addMoney = () => {
	// 	setMoney(money + 1)
	// }

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		window.document.title = 'Todo Manager'
		loadFromStorage()

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
			<TodoList
				todos={todos}
				addTodo={addTodo}
				clearCompletedTodos={clearCompletedTodos}
				toggleTodo={toggleTodo}
			/>
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
