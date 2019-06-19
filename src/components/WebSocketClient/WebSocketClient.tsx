import React, { FC, useEffect, useState } from "react"

import './WebSocketClient.scss'

const WebSocketClient: FC = () => {
	const [logLines, setLogLines] = useState<string[]>([])

	const appendToLog = (msg: string, emitToConsole = true) => {
		if (emitToConsole) {
			console.log(msg)
		}
		setLogLines(logLines => logLines.concat(msg))
	}

	// NOTE: This happens before un-render (only once)
	const handleUnmount = () => {}

	// NOTE: This happens after render (only once)
	const handleMounted = () => {
		appendToLog('component mounted')
		// NOTE: create socket to echo server (use secure protocol, i.e. `wss` not `ws`)
		const secureWebSocketProto = 'wss://'
		const webSocketClient = new WebSocket(`${secureWebSocketProto}localhost:5001/ws`)

		webSocketClient.onopen = evt => {
			appendToLog('web socket is opened! sending message to server...')
			const webSocketTarget: WebSocket = evt.target as WebSocket
			// NOTE: send message to server
			webSocketTarget.send('ello!!!')
		}

		webSocketClient.onmessage = evt => {
			const { data, target, type } = evt
			const webSocketTarget: WebSocket = target as WebSocket
			appendToLog(`message received from="${webSocketTarget.url}" type="${type}" data="${data}"`)
		}

		return handleUnmount
	}

	// NOTE: empty (no arg) to track nothing, just fire on mount/unmount
	useEffect(handleMounted, [])

	return (
		<article className="websocket-client">
			<h1>Web Socket Client</h1>
			<section>
				<h2>Log</h2>
				{/*
				<textarea cols={80} rows={12} value={logLines} />
				*/}
				<textarea cols={80} rows={12} value={logLines.join('\n')} />
				{/*
				*/}
				{/*
				<textarea cols={80} rows={12} value={logLines.map(logLine => `${logLine}\n`)} />
				*/}
			</section>
		</article>
	)
}

export { WebSocketClient }
