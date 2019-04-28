import React, { useState } from 'react'

import './CritterList.css'

class CritterModel {
	public static MAX_ATTACK = 5
	public static MAX_DEFENSE = 5
	public static MAX_HITPOINTS = 10

	constructor(
		public hitpoints: number,
		public attack: number,
		public defense: number
	) {}
}

const useCritterState = (initialValue: CritterModel[]) => {
	const [critters, setCritters] = useState(initialValue)

	const addCritter = (newCritter: CritterModel) => {
		setCritters(critters.concat(newCritter))
	}

	return {
		critters,
		addCritter,
		// deleteCritter: (critterId: string) => {
		// 	setCritters(critters.filter(critter => critter.id !== critterId))
		// },
		loadFromStorage: () => {
			if (window.localStorage) {
				console.info('localStorage is available! loading critter...')
				const storedCritterStr = window.localStorage.getItem(
					'react-hooks-todo.critters'
				)
				if (storedCritterStr && storedCritterStr.length) {
					setCritters(JSON.parse(storedCritterStr))
				}
			}
		},
		saveToLocalStorage: () => {
			if (!window.localStorage) {
				alert('local storage not available, unable to save 😢')
				return
			}
			console.info('localStorage is available! saving critters...')
			window.localStorage.setItem('react-hooks-todo.critters', JSON.stringify(critters))
		},
		spawnCritter: () => {
			addCritter(
				new CritterModel(
					1 + Math.round(Math.random() * (CritterModel.MAX_HITPOINTS - 1)),
					1 + Math.round(Math.random() * (CritterModel.MAX_ATTACK - 1)),
					1 + Math.round(Math.random() * (CritterModel.MAX_DEFENSE - 1))
				)
			)
		}
	}
}

const CritterList = () => {
	const { critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	return (
		<article className="critter-list">
			<button onClick={() => { spawnCritter() }}>
				Spawn Critter
			</button>
			<button onClick={() => { saveToLocalStorage() }}>
				Save Critters (local)
			</button>
			<button onClick={() => { loadFromStorage() }}>
				Load Critters (local)
			</button>
			{critters.map(critter => {
				return (
					<section className="critter">
						<table>
							<tr>
								<td>HP</td>
								<td>{critter.hitpoints}</td>
							</tr>
							<tr>
								<td>Attack</td>
								<td>{critter.attack}</td>
							</tr>
							<tr>
								<td>Defense</td>
								<td>{critter.defense}</td>
							</tr>
						</table>
					</section>
				)
			})}
		</article>
	)
}

export { CritterList }
