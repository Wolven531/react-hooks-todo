import { useState } from 'react'

const upgradeStore = (() => {
	const [gathererLevel, setGathererLevel] = useState(0)
	const upgradeGatherers = () => {
		setGathererLevel(gathererLevel => gathererLevel + 1)
	}

	return {
		gathererLevel,
		upgradeGatherers
	}
})()

export { upgradeStore }
