import { useState } from 'react'

import { TodoModel } from './TodoModel'

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
				const storedTodoStr = window.localStorage.getItem('react-hooks-todo.todos')
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

export { useTodoState }
