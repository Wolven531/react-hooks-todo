import { Combatant } from '../model/Combatant'
import { Critter } from '../model/Critter'
import { Turn } from '../model/Turn'
import { Weapon } from '../model/Weapon'

const isOver = (fighter1: Combatant, fighter2: Combatant) => fighter1.currentHitpoints <= 0 || fighter2.currentHitpoints <= 0

const getDamageForAttack = (fighter: Combatant, weapon: Weapon) => {
	// TODO: ensure chance is taken into account
	return fighter.attack + weapon.minimumDamage
}

const combatService = () => {
	const fight = (
		fighter1: Critter,
		fighter2: Critter,
		weapon1: Weapon,
		weapon2: Weapon): Turn[] => {
			console.info(`[ fight | combatService] Starting...`)
			const turns: Turn[] = []
			const c1 = new Combatant(fighter1)
			const c2 = new Combatant(fighter2)

			while (!isOver(c1, c2)) {
				const t = new Turn(c1, c2, weapon1, weapon2)
				console.info(`[ fight | combatService] Creating turn ${JSON.stringify(t)}...`)
				// NOTE: primary attack for turn
				console.info(`${c1.name} attacks ${c2.name} with ${weapon1.name}...`)
				const damage = getDamageForAttack(c1, weapon1)
				c2.currentHitpoints -= damage
				// NOTE: potential counterattack?
				// TODO: add c2 attacking c1
			}

		return turns
	}

	return {
		fight
	}
}

export { combatService }
