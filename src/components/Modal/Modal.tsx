import React, { FC, MouseEvent } from 'react'

import './Modal.scss'

interface IModalProps {
	handleModalDialogClose: () => void
	isLoading?: boolean
	showCloseButton?: boolean
}

const Modal: FC<IModalProps> = ({
	handleModalDialogClose,
	children,
	showCloseButton = true,
	isLoading = false
	}) => {
	const handleModalClick = (evt: MouseEvent) => {
		// TODO: figure out how to alert the user about the modal
		// const { currentTarget, target, preventDefault } = evt
		// preventDefault()
		// alert(`Must close the modal... ${(target as Element).classList}`)
	}

	return (
		<div onClick={handleModalClick} className="modal-container">
			<div className="modal">
				{isLoading
					? <div>Spinner</div>
					: <div>
						{showCloseButton
							? <button onClick={handleModalDialogClose} className="close">X</button>
							: null
						}
						{children}
					</div>}
			</div>
		</div>
	)
}

export { Modal }
