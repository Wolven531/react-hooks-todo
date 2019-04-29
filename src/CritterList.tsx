import React, { useEffect, useState } from 'react'

import { v1 } from 'uuid'

import './CritterList.css'

class CritterModel {
	public static MAX_ATTACK = 5
	public static MAX_DEFENSE = 5
	public static MAX_HITPOINTS = 10

	constructor(
		public name: string,
		public hitpoints: number,
		public attack: number,
		public defense: number,
		public id?: string
	) {
		if (!id) {
			this.id = v1()
			// console.info(`[ctor | Critter] No ID, generated="${id}"...`)
		}
	}
}

const useCritterState = (initialValue: CritterModel[]) => {
	const [critters, setCritters] = useState(initialValue)

	const addCritter = (newCritter: CritterModel) => {
		setCritters(critters.concat(newCritter))
	}

	return {
		critters,
		addCritter,
		clearCritters: () => {
			setCritters([])
		},
		// deleteCritter: (critterId: string) => {
		// 	setCritters(critters.filter(critter => critter.id !== critterId))
		// },
		loadFromStorage: () => {
			if (window.localStorage) {
				// console.info('localStorage is available! loading critter...')
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
			// console.info('localStorage is available! saving critters...')
			window.localStorage.setItem('react-hooks-todo.critters', JSON.stringify(critters))
		},
		spawnCritter: async () => {
			const nameResponse = await fetch(`https://randomuser.me/api/`)

			if (nameResponse.status !== 200) {
				console.warn(`Failed to generate random name, status=${nameResponse.status} ${nameResponse.statusText}`)
				return
			}

			const nameData = await nameResponse.json()
			// const { first, last } = nameData.results[0].name
			const { first }: { first: string } = nameData.results[0].name
			const firstLetter = first.charAt(0).toUpperCase()

			addCritter(
				new CritterModel(
					`${firstLetter}${first.substring(1)}`,
					1 + Math.round(Math.random() * (CritterModel.MAX_HITPOINTS - 1)),
					1 + Math.round(Math.random() * (CritterModel.MAX_ATTACK - 1)),
					1 + Math.round(Math.random() * (CritterModel.MAX_DEFENSE - 1))
				)
			)
		}
	}
}

const CritterList = () => {
	const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	useEffect(() => {
		loadFromStorage()
	}, [])

	const toggleSelectedOnClick = (evt: React.MouseEvent) => {
		if (evt.currentTarget.classList.contains('selected')){
			evt.currentTarget.classList.remove('selected')
			return
		}
		evt.currentTarget.classList.add('selected')
	}

	return (
		<article className="critter-list">
			<button onClick={() => { spawnCritter() }}>
				Spawn Critter
			</button>
			<button onClick={() => { saveToLocalStorage() }}>
				Save Critters (local)
			</button>
			<button onClick={() => { clearCritters() }}>
				Clear Critters
			</button>
			<section className="display-container">
				{critters.map(critter => {
					// console.info(`[render | CritterList] Rendering id="${critter.id}"`)
					return (
						<section className="critter" key={critter.id} onClick={toggleSelectedOnClick}>
							<table>
								<thead>
									<tr>
										<td colSpan={2}>{critter.id}</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Name</td>
										<td>{critter.name}</td>
									</tr>
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
								</tbody>
							</table>
						</section>
					)
				})}
			</section>
		</article>
	)
}

export { CritterList }
