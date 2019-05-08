import React from 'react'

import './CritterListControls.css'

interface ICritterListControlsProps {
	clearCritters: () => void
	saveToLocalStorage: () => void
	spawnCritter: () => void
}

const CritterListControls = ({ clearCritters, saveToLocalStorage, spawnCritter }: ICritterListControlsProps) => {
	return (
		<section className="critter-list-controls">
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
	)
}

export { CritterListControls }
