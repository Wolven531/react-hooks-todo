import { Critter } from '../model/Critter'
import { Turn } from '../model/Turn'
import { Weapon } from '../model/Weapon'

const combatService = () => {
	const fight = (
		fighter1: Critter,
		fighter2: Critter,
		weapon1: Weapon,
		weapon2: Weapon): Turn[] => {
			const turns: Turn[] = []

		return turns
	}

	return {
		fight
	}
}

export { combatService }
