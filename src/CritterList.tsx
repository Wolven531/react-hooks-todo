import React, { useEffect } from 'react'

import { useCritterState } from './useCritterState'

import './CritterList.css'

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
			<section className="controls">
				<button className="create" onClick={() => { spawnCritter() }}>
					Spawn Critter
				</button>
				<button className="update" onClick={() => { saveToLocalStorage() }}>
					Save Critters (local)
				</button>
				<button className="delete" onClick={() => { clearCritters() }}>
					Clear Critters
				</button>
			</section>
			<section className="display-container">
				{critters.map(critter => {
					// console.info(`[render | CritterList] Rendering id="${critter.id}"`)
					return (
						<section className="critter" key={critter.id} onClick={toggleSelectedOnClick}>
							<table>
								{/*
								<thead>
									<tr>
										<td colSpan={2}>{critter.id}</td>
									</tr>
								</thead>
								*/}
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
