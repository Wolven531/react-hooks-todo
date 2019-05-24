import React, { useEffect } from 'react'

import { Critter } from '../Critter/Critter'
import { CritterListControls } from '../CritterListControls/CritterListControls'

import { useCritterState } from '../../state/useCritterState'

import './CritterList.css'

const CritterList = () => {
	const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	const startCombat = () => {

	}

	useEffect(() => {
		loadFromStorage()
	}, [])

	return (
		<article className="critter-list">
			<CritterListControls
				clearCritters={clearCritters}
				saveToLocalStorage={saveToLocalStorage}
				spawnCritter={spawnCritter}
				startCombat={startCombat} />
			<section className="display-container">
				{critters.map(critter => <Critter key={critter.id} critter={critter} />)}
			</section>
		</article>
	)
}

export { CritterList }