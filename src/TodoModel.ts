class TodoModel {
	constructor(
		public id: number,
		public description: string,
		public completed = false
	) {}
}

export { TodoModel }
