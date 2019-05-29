import React, { useState, useEffect, useRef, MutableRefObject } from 'react'

// NOTE: Inspired by https://overreacted.io/making-setinterval-declarative-with-react-hooks/

const useInterval = (callback: () => void, delay?: number) => {
	const savedCallback: MutableRefObject<Function> = useRef() as MutableRefObject<Function>

	// Store the latest callback
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval
	useEffect(() => {
		const tick = () => {
			savedCallback.current()
		}
		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => { clearInterval(id) }
		}
	}, [delay])
}

export { useInterval }
