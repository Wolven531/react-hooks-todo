class TodoModel {
	constructor(
		public id: number,
		public description: string,
		public completed = false,
		public creationTimestamp: number
	) {}
}

export { TodoModel }
