import React, { useEffect } from 'react'

import { Critter } from '../../components/Critter/Critter'
import { CritterListControls } from '../../components/CritterListControls/CritterListControls'

import { useCritterState } from '../../state/useCritterState'

import './CritterList.css'

const COMBAT_COST = 100

interface ICritterListProps {
	currentMoney: number
}

const CritterList = ({ currentMoney }: ICritterListProps) => {
	const { clearCritters, critters, loadFromStorage, saveToLocalStorage, spawnCritter } = useCritterState([])

	const startCombat = () => {
		console.log('[startCombat | CritterList] Starting combat...')
	}

	useEffect(() => {
		loadFromStorage()
	}, [])

	return (
		<article className="critter-list">
			<CritterListControls
				canStartCombat={currentMoney >= COMBAT_COST}
				clearCritters={clearCritters}
				saveToLocalStorage={saveToLocalStorage}
				shouldShowCombat={true}
				spawnCritter={spawnCritter}
				startCombat={startCombat} />
			<section className="display-container">
				{critters.map(critter => <Critter key={critter.id} critter={critter} />)}
			</section>
		</article>
	)
}

export { CritterList }
