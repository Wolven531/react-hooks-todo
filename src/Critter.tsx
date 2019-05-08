import React from 'react'

import { CritterModel } from './CritterModel'

import './Critter.css'

interface ICritterProps {
	critter: CritterModel
}

const Critter = ({ critter }: ICritterProps) => {
	const toggleSelectedOnClick = (evt: React.MouseEvent) => {
		if (evt.currentTarget.classList.contains('selected')){
			evt.currentTarget.classList.remove('selected')
			return
		}
		evt.currentTarget.classList.add('selected')
	}

	return (
		<section className="critter" onClick={toggleSelectedOnClick}>
			<table>
				{/*
				<thead>
					<tr>
						<td colSpan={2}>{critter.id}</td>
					</tr>
				</thead>
				*/}
				<tbody>
					<tr>
						<td>Name</td>
						<td>{critter.name}</td>
					</tr>
					<tr>
						<td>HP</td>
						<td>{critter.hitpoints}</td>
					</tr>
					<tr>
						<td>Attack</td>
						<td>{critter.attack}</td>
					</tr>
					<tr>
						<td>Defense</td>
						<td>{critter.defense}</td>
					</tr>
				</tbody>
			</table>
		</section>
	)
}

export { Critter }
