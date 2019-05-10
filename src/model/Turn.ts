import { Critter } from './Critter';
import { Weapon } from './Weapon';
export class Turn {
	constructor(public fighter1: Critter, public fighter2: Critter, public weapon1: Weapon, public weapon2: Weapon) { }
}
