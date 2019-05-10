import { Critter } from '../model/Critter'

class Combatant extends Critter {
	constructor(
		public name: string,
		public hitpoints: number,
		public attack: number,
		public defense: number,
		public id?: string,
		public currentHitpoints?: number
	) {
		super(name, hitpoints, attack, defense, id)

		if (currentHitpoints === undefined) {
			this.currentHitpoints = hitpoints
		}
	}
}

export { Combatant }
