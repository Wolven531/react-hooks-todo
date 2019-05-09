class Todo {
	constructor(
		public id: string,
		public description: string,
		public completed = false,
		public creationTimestamp: number
	) {}
}

export { Todo }
