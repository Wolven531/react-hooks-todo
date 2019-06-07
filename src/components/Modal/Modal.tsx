import React, { FC, MouseEvent } from 'react'

interface IModalProps {
	handleModalDialogClose: () => void
}

const Modal: FC<IModalProps> = ({ handleModalDialogClose }) => {
	const handleModalClick = (evt: MouseEvent) => {
		// TODO: figure out how to alert the user about the modal
		// const { currentTarget, target, preventDefault } = evt
		// preventDefault()
		// alert(`Must close the modal... ${(target as Element).classList}`)
	}

	return (
		<div onClick={handleModalClick} className="modal-container">
			<div className="modal">
				{false // TODO: this should be `isLoading`
					? <div>Spinner</div>
					: <div>
						<button onClick={handleModalDialogClose} className="close">X</button>
						<h1>Modal Dialog Content</h1>
					</div>}
			</div>
		</div>
	)
}

export { Modal }
