import React, { useEffect } from 'react'

import { Critter } from './Critter'
import { CritterListControls } from './CritterListControls'

import { useCritterState } from './useCritterState'

import './CritterList.css'

const CritterList = () => {
	const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	useEffect(() => {
		loadFromStorage()
	}, [])

	return (
		<article className="critter-list">
			<CritterListControls clearCritters={clearCritters} saveToLocalStorage={saveToLocalStorage} spawnCritter={spawnCritter} />
			<section className="display-container">
				{critters.map(critter => <Critter key={critter.id} critter={critter} />)}
			</section>
		</article>
	)
}

export { CritterList }
