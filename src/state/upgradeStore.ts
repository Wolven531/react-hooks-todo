import { useState, Dispatch, SetStateAction } from 'react'

class UpgradeStore {
	public gathererLevel: number

	private setGathererLevel: Dispatch<SetStateAction<number>>

	constructor(public initialLevel = 0) {
		const [ _gathererLevel, setGathererLevel ] = useState(initialLevel)
		this.setGathererLevel = setGathererLevel
		this.gathererLevel = _gathererLevel
	}

	public upgradeGatherers(): void {
		this.setGathererLevel(gathererLevel => gathererLevel + 1)
	}

	// const [gathererLevel, setGathererLevel] = useState(0)
	// const upgradeGatherers = () => {
	// 	setGathererLevel(gathererLevel => gathererLevel + 1)
	// }

	// return {
	// 	gathererLevel,
	// 	upgradeGatherers
	// }
}

export { UpgradeStore }
